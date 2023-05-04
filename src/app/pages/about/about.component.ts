import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    if (!this.userService.userLogged) {
      this.router.navigateByUrl('');
    }
  }
}
