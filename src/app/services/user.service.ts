import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userLogged: UserCredential | undefined;
  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly firebaseStoreProvider: FirebaseStoreProvider
  ) {}

  public async loginWithGoogle() {
    this._userLogged =
      await this.firebaseAuthProvider.loginWithGoogleAuthProvider();
    return this._userLogged.user;
  }

  public get userLogged() {
    return this._userLogged?.user;
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
    this.firebaseAuthProvider.signOut();
    this._userLogged = undefined;
  }

  // private isUserExisting(user: User): boolean {
  //   const users: Array<User> = this.localStorageProvider.getUsers();
  //   return users.some((u) => u.email === user.email);
  // }
}
