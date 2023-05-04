import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from '../models/contry.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    return this.httpClient
      .get('https://restcountries.com/v3.1/subregion/South America')
      .pipe(
        map((data: any) => {
          return Array.from(data).map((p: any) => {
            const country: Country = {
              name: p.name.common,
              flag: p.flags.svg,
              capital: p.capital.shift(),
            };
            return country;
          });
        })
      );
  }
}
