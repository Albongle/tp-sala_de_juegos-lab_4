import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AlertService } from '../../../../services/alert.service';
import { UserService } from '../../../../services/user.service';
import { CountryService } from '../../../../services/country.service';
import { Country } from '../../../../models/contry.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  protected countries: Country[];
  protected susbcribeCountries: Subscription;
  protected formNewUser: FormGroup;

  constructor(
    private readonly alertService: AlertService,
    private readonly userService: UserService,
    private readonly countriesService: CountryService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.formNewUser = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      country: ['', Validators.required],
      user: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.susbcribeCountries = this.countriesService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }
  ngOnDestroy(): void {
    //aca desuscribirme
    if (this.susbcribeCountries) {
      this.susbcribeCountries.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.userService.userLogged) {
      this.router.navigateByUrl('');
    }
  }

  public async registeWithFirebase(): Promise<void> {
    try {
      this.validateForm();
      const user = new User(this.formNewUser.value);
      const register = await this.userService.registerWithFirebase(user);
      const userSave = this.userService.saveUserInStore(user);

      console.log(register);
      console.log(userSave);
      this.alertService.showAlert({
        icon: 'success',
        message: 'Se registro usuario de forma exitosa',
      });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }

    this.cleanFields();
  }

  private cleanFields(): void {
    for (const key in this.formNewUser.controls) {
      this.formNewUser.controls[key].setValue(undefined);
    }
  }

  private validateForm() {
    if (this.formNewUser.invalid) {
      throw new Error('Debe completar los datos para el registro');
    }
  }
}
