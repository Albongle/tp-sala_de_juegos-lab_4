import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { User as UserFire } from 'firebase/auth';
import { SessionStorageProvider } from '../providers/session_storage.provider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userLogged: UserFire | null;
  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly firebaseStoreProvider: FirebaseStoreProvider,
    private readonly sessionStorageProvider: SessionStorageProvider,
    private readonly router: Router
  ) {}

  public async loginWithGoogle() {
    const result =
      await this.firebaseAuthProvider.loginWithGoogleAuthProvider();
    this._userLogged = result.user;
    const user = new User({
      userId: result.user.uid,
      name: result.user.displayName!,
      email: result.user.email!,
    });
    await this.saveUserWithIdInStore(user.userId!, user);
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

  public setUserLogger() {
    this._userLogged = this.sessionStorageProvider.getCurrentUser();
  }

  public async registerWithFirebase(user: User) {
    const result =
      await this.firebaseAuthProvider.registerUserWithEmailAndPassword(user);
    user.userId = result.user.uid;
    await this.saveUserWithIdInStore(user.userId, user);
    return user;
  }
  public getUsersFromStore() {
    return this.firebaseStoreProvider.getCollection('usuarios');
  }

  public saveUserWithIdInStore(id: string, user: User) {
    return this.firebaseStoreProvider.setDocWithId(
      'usuarios',
      id,
      JSON.parse(JSON.stringify(user))
    );
  }
  public logout() {
    this.firebaseAuthProvider.signOut().then(() => {
      this._userLogged = null;
      this.router.navigateByUrl('');
    });
  }
}
