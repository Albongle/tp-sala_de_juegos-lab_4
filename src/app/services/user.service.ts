import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { User as UserFire } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userLogged: UserFire | null;
  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly firebaseStoreProvider: FirebaseStoreProvider
  ) {}

  public async loginWithGoogle() {
    const result =
      await this.firebaseAuthProvider.loginWithGoogleAuthProvider();
    this._userLogged = result.user;
    return this._userLogged;
  }
  public async loginWithEmailAndPassword(user: User) {
    const result = await this.firebaseAuthProvider.loginWithEmailAndPassword(
      user
    );
    this._userLogged = result.user;
    return this._userLogged;
  }

  public get userLogged() {
    return this._userLogged;
  }

  public async setUserLogger() {
    this.firebaseAuthProvider.authState((user) => {
      this._userLogged = user;
    });
  }

  public registerWithFirebase(user: User) {
    return this.firebaseAuthProvider.registerUserWithEmailAndPassword(user);
  }
  public getUsersFromStore() {
    return this.firebaseStoreProvider.getCollection('usuarios');
  }
  public saveUserInStore(user: User) {
    return this.firebaseStoreProvider.saveDoc('usuarios', { ...user });
  }
  public logout() {
    this.firebaseAuthProvider.signOut().then(() => {
      this._userLogged = null;
    });
  }
}
