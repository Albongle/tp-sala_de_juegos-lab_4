import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  constructor(private readonly fireAuth: Auth) {}

  public loginWithEmailAndPassword(user: User) {
    return signInWithEmailAndPassword(this.fireAuth, user.email!, user.email!);
  }

  public registerUserWithEmailAndPassword(user: User) {
    return createUserWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public loginWithGoogleAuthProvider() {
    return signInWithPopup(this.fireAuth, new GoogleAuthProvider());
  }

  public signOut() {
    this.fireAuth.signOut();
  }
}
