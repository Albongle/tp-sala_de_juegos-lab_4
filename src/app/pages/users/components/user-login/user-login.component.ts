import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  protected email: string;
  protected password: string;

  constructor(
    private readonly alertService: AlertService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.userLogged) {
      this.router.navigateByUrl('games');
    }
  }

  public loginUser() {
    this.cleanFields();
  }

  public async loginWithGoogle() {
    const user = await this.userService.loginWithGoogle();
    const message = user ? `Bienvenido ${user.displayName}` : 'Login no ok';
    const icon = user ? 'success' : 'error';
    this.alertService.showAlert({ icon, message: message });
    this.router.navigateByUrl('games');
    sessionStorage.setItem('access_token', await user.getIdToken());
  }

  private cleanFields(): void {
    this.password = '';
    this.email = '';
  }
}
