import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    protected readonly userService: UserService,
    private readonly router: Router
  ) {}

  public signOut() {
    this.userService.logout();
    this.router.navigateByUrl('');
  }
}
