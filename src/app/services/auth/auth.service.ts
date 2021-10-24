import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { events } from 'src/app/interfaces/log';
import { setUserType, User, UserProfiles } from 'src/app/interfaces/user';
import { FileService } from '../file/file.service';
import { LogService } from '../log/log.service';
import { UserService } from '../user/user.service';
import { Validator } from './Validators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: firebase.User | null = null;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private file: FileService,
    private userDb: UserService,
    private log: LogService
  ) {
    angularFireAuth.authState.subscribe((u) => {
      this.user = u;
    });
  }

  // Obtener True o false si hay un usuario logueado
  get authenticated(): boolean {
    return this.user != null; // True ó False
  }

  // Obtener los datos del usuario logueado, o null si no hubiere
  get currentUser(): firebase.User | null {
    return this.user;
  }

  signIn = async (email: string, password: string) =>
    await this.angularFireAuth
      .signInWithEmailAndPassword(Validator.email(email), password)
      .then((res) => {
        this.checkLogIn(res);
        return res;
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
      .then((res) => {
        this.checkSignUp(res, user, files);
        return res;
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

  signOut = async (uid: string) => {
    await this.angularFireAuth.signOut().then(() => {
      this.userDb.getUser(uid).then((u: User) => {
        this.log.saveEvent(uid, events.logOut, u.tipo);
      });
    });
  };

  private checkLogIn(res: any) {
    //check email verifification
    if (!res.user?.emailVerified) {
      this.sendVerificationEmail();
      throw new Error('Verificá tu email para loguearte');
    }
    this.userDb.getUser(res.user?.uid ?? '').then((u: User) => {
      //check admin validation
      if (u.tipo === UserProfiles.specialist)
        this.userDb.getUser(res.user?.uid ?? '').then((user: any) => {
          if (!user.verificado)
            throw new Error('Tu perfil no ha sido aprobado aún.');
        });
      //save log
      this.log.saveEvent(res.user?.uid ?? '', events.logIn, u.tipo);
    });
  }

  private checkSignUp(res: any, user: User, files: Array<File>) {
    //settea el tipo de usuario
    setUserType(user);
    //actualiza el perfil de auth (guarda variable para authenticar)
    this.updateUserProfileNameAndType(user);
    //envia mail de verificacion
    this.sendVerificationEmail().then((sended: boolean | undefined) => {
      if (!sended)
        throw new Error(
          'No se pudo enviar el email de verificación. Por favor ingrese un email válido.'
        );
      //guarda imagenes, datos y logs
      this.handleFiles(user, res.user?.uid ?? '', files).then(() => {
        this.userDb.newUser(res.user?.uid ?? '', user);
        this.log.saveEvent(res.user?.uid ?? '', events.newUser, user.tipo);
      });
    });
  }

  private sendVerificationEmail = async (): Promise<boolean | undefined> =>
    await firebase
      .auth()
      .currentUser?.sendEmailVerification()
      .then(() => true)
      .catch(() => false);

  private updateUserProfileNameAndType(user: User) {
    firebase.auth().currentUser?.updateProfile({
      displayName: user.apellido + ', ' + user.nombre,
    });
  }

  private handleFiles = async (user: User, uid: string, files: Array<File>) =>
    Array.from(files).forEach(async (file: any) => {
      user.img_urls.push(
        await this.file.uploadAndGetLink(uid, file).then((url) => url)
      );
    });
}
