import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AlertService } from '../../../../services/alert.service';
import { UserService } from '../../../../services/user.service';
import { CountryService } from '../../../../services/country.service';
import { Country } from '../../../../models/contry.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  protected user: User;
  protected countries: Country[];
  protected countrySelected: Country;
  protected susbcribeCountries;

  constructor(
    private readonly alertService: AlertService,
    private readonly userService: UserService,
    private readonly countriesService: CountryService,
    private readonly router: Router
  ) {
    this.user = new User();
    this.susbcribeCountries = this.countriesService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }
  ngOnDestroy(): void {
    //aca desuscribirme
    this.susbcribeCountries.unsubscribe();
  }

  ngOnInit(): void {
    if (this.userService.userLogged) {
      this.router.navigateByUrl('');
    }
  }

  public async registeWithFirebase(): Promise<void> {
    try {
      const register = await Promise.all([
        this.userService.registerWithFirebase(this.user),
        this.userService.saveUserInStore(this.user),
      ]);

      console.log(register);

      this.alertService.showAlert({
        icon: 'success',
        message: 'Se registro usuario de forma exitosa',
      });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }

    this.cleanFields();
  }

  // public prueba(): void {
  //   this.userService.getUsersFromStore().subscribe((a) => console.log(a));
  // }
  private cleanFields(): void {
    this.user.email = '';
    this.user.address = '';
    this.user.name = '';
    this.user.lastName = '';
    this.user.password = '';
    this.user.user = '';
  }

  public selectedCountry(): void {
    this.user.country = this.countrySelected;
  }
}
