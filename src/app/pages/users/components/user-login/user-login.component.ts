import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  protected formLogin: FormGroup;

  constructor(
    private readonly alertService: AlertService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.userService.userLogged) {
      this.router.navigateByUrl('games');
    }
  }

  public async loginWithMailAndPassword() {
    const user = new User(this.formLogin.value);
    try {
      const userLog = await this.userService.loginWithEmailAndPassword(user);
      this.alertService.showAlert({
        icon: 'success',
        message: `Bienvenido ${userLog.email}`,
      });
      this.router.navigateByUrl('games');
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }

    this.formLogin.reset();
  }

  public async loginWithGoogle() {
    const user = await this.userService.loginWithGoogle();
    const message = user ? `Bienvenido ${user.displayName}` : 'Login no ok';
    const icon = user ? 'success' : 'error';
    this.alertService.showAlert({ icon, message: message });
    this.router.navigateByUrl('games');
  }

  public setUserTest() {
    this.setUser('email@mail.com', '1234567');
  }

  public setUserAdmin() {
    this.setUser('admin@mail.com', '1234567');
  }
  private setUser(email: string, password: string) {
    this.formLogin.setValue({ email, password });
  }
}
