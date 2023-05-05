import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './components/user-register/user-register.component';

@NgModule({
  declarations: [UserComponent, UserLoginComponent, UserRegisterComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [UserComponent],
})
export class UserModule {}
