export class Country {
  name?: string;
  flag?: string;
  capital?: string;
  constructor(country: { name?: string; flag?: string; capital?: string }) {
    this.capital = country.capital;
    this.flag = country.flag;
    this.name = country.name;
  }
}
