import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  protected name: string;
  protected imgDefault: string;
  constructor(
    protected readonly userService: UserService,
    private readonly router: Router
  ) {
    this.imgDefault = '../../../assets/images/user_default.png';
  }
  ngOnInit(): void {}

  public signOut() {
    this.userService.logout();
    this.router.navigateByUrl('');
  }
}
