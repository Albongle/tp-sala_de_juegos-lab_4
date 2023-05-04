import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProvider {
  public getUsers(): Array<User> {
    return JSON.parse(localStorage.getItem('users') as string) || [];
  }

  public saveUsers(user: User) {
    const users: Array<User> = this.getUsers();

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    return true;
  }
}
