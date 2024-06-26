import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  constructor(private readonly fireAuth: Auth) {
    this.fireAuth.setPersistence(browserSessionPersistence);
  }

  public loginWithEmailAndPassword(user: User) {
    return signInWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public registerUserWithEmailAndPassword(user: User) {
    return createUserWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public get ApiKey() {
    return this.fireAuth.config.apiKey;
  }

  public loginWithGoogleAuthProvider() {
    return signInWithPopup(this.fireAuth, new GoogleAuthProvider());
  }

  public signOut() {
    return this.fireAuth.signOut();
  }
}
