import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { events } from 'src/app/interfaces/log';
import { User, UserProfiles } from 'src/app/interfaces/user';
import { LogService } from '../log/log.service';
import { UserService } from '../user/user.service';
import { Validator, whiteList } from './Validators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private sub?: Subscription;
  private user: any | null = null;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private userDb: UserService,
    private log: LogService
  ) {
    this.listenUser();
  }

  get authUserObservable(): Observable<firebase.User | null> {
    return this.angularFireAuth.authState;
  }

  getCurrentUserType = async (uid: string): Promise<number | null> => {
    return await this.userDb
      .getUser(uid)
      .then((dbUser) => dbUser.tipo)
      .catch(() => null);
  };

  get currentUser(): firebase.User | null {
    return this.user;
  }

  get authenticated(): boolean {
    return this.user ? true : false;
  }

  signIn = async (email: string, password: string) =>
    await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        await this.handleLogin(res).then(() => res);
      })
      .catch((error) => {
        if (error.code === 'auth/user-disabled')
          throw new Error('El usuario ha sido deshabilitado.');
        if (error.code === 'auth/user-not-found')
          throw new Error('No existe un usuario con estos datos.');
        throw error;
      });

  signUp = async (user: User, password: string, files: Array<File>) =>
    await this.angularFireAuth
      .createUserWithEmailAndPassword(Validator.email(user.mail), password)
      .then(async (res) => {
        return await this.handleSignUp(res, user, files).then(() => res);
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed')
          throw new Error(
            'Lo siento, hubo un error interno. Vuelva a intentarlo en otro momento.'
          );
        throw error;
      });


  passRecovery = async (email: string) => {
    this.angularFireAuth
      .sendPasswordResetEmail(email)
      .catch(() => new Error('Email incorrecto.'));
  };

  signOut = async (uid: string, tipo: number) => {
    await this.angularFireAuth.signOut().then(() => {
      this.log.saveEvent(uid, events.logOut, tipo);
    });
  };

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private listenUser() {
    this.sub = this.angularFireAuth.authState.subscribe(async (authUser) => {
      this.user = authUser;
      if (authUser)
        await this.userDb.getUser(authUser.uid ?? '').then((dbUser) => {
          this.user.multiFactor.user.tipo = dbUser.tipo;
        });
    });
  }

  /**
   * 1- Chequea que el email este verificado
   * 2- Chequea que el perfil del especialista este aprobado por un admin (solo perfil correspondiente)
   * 3- Guarda el evento de logueo en la coleccion Logs
   * Retorna errores con mensaje para mostrar.
   * @param res
   */
  private handleLogin = async (res: any) => {
    //check email verifification
    if (!res.user?.emailVerified && !whiteList.includes(res.user.email)) {
      this.sendVerificationEmail();
      throw new Error(
        'Tu correo electrónico no ha sido verificado. Por favor verifícalo para ingresar.'
      );
    }
    await this.userDb.getUser(res.user?.uid ?? '').then((user: any) => {
      //check admin/specialist validation
      if (user.tipo === UserProfiles.specialist && !user.verificado)
        throw new Error('Tu perfil no ha sido aprobado aún.');
      //save log
      this.log.saveEvent(res.user?.uid ?? '', events.logIn, user.tipo);
    });
  };

  /**
   * 1- Setea la variable tipo en el usuario, para identificar los perfiles.
   * 2- Envía mail de verificación | retorna error con mensaje para mostrar si no se pudo enviar
   * 3- Maneja los datos del usuario guardando logs, archivos, datos (y actualizando el perfil del auth user)
   * Retorna errores con mensaje para mostrar.
   * @param res
   */
  private handleSignUp = async (res: any, user: User, files: Array<File>) => {
    //envia mail de verificacion
    await this.sendVerificationEmail().then(
      async (sended: boolean | undefined) => {
        if (!sended)
          throw new Error(
            'No se pudo enviar el email de verificación. Por favor ingrese un email válido.'
          );
      }
    );
  };

  private sendVerificationEmail = async (): Promise<boolean | undefined> =>
    await firebase
      .auth()
      .currentUser?.sendEmailVerification()
      .then(() => true)
      .catch(() => false);

  manageUserData = async (user: User, res: any /*, files: File[]*/) => {
    //guarda imagenes, datos y logs
    // await this.handleFiles(user, res.user?.uid ?? '', files).then(() => {
    await Promise.all([
      await this.userDb.newUser(res.user?.uid ?? '', user),
      await this.log.saveEvent(res.user?.uid ?? '', events.newUser, user.tipo),
    ]);
    //actualiza el perfil de auth
    this.updateAuthUserProfile(user);
    // });
  };

  private updateAuthUserProfile(user: User) {
    firebase.auth().currentUser?.updateProfile({
      displayName: user.apellido + ', ' + user.nombre,
      photoURL: user.img_urls[0] ?? '',
    });
  }
}
