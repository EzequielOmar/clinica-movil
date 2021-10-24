import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
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
    private log: LogService,
    private userDb: UserService
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


        return res;
      })
      .catch((error) => {
        if (error.code === 'auth/user-disabled') {
          throw new Error('El usuario ha sido deshabilitado.');
        }
        if (error.code === 'auth/user-not-found') {
          throw new Error('No existe un usuario con estos datos.');
        }
        throw new Error('Datos incorrectos.');
      });

  signUp = async (email: string, password: string, username: string) =>
    await this.angularFireAuth
      .createUserWithEmailAndPassword(Validator.email(email), password)
      .then((res) => {

        // firebase.auth().currentUser?.sendEmailVerification();



        return res;
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          throw new Error(
            'Lo siento, hubo un error interno. Vuelva a intentarlo mas tarde.'
          );
        }
        throw new Error('Datos incorrectos.');
      });

  passRecovery = async (email: string) => {
    this.angularFireAuth.sendPasswordResetEmail(email).catch(() => {
      throw new Error('Email incorrecto.');
    });
  };

  signOut = async (uid: string) => {
    await this.angularFireAuth.signOut().then(() => {

      //this.log.saveEvent(uid, events.logOut);
    });
  };
}
