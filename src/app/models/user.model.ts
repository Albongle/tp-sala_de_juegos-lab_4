import { Country } from './contry.model';

export class User {
  name: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
  country: Country | undefined;
  email: string | undefined;
  password: string | undefined;
  user: string | undefined;
  constructor(user?: {
    name?: string;
    lastName?: string;
    address?: string;
    country?: Country;
    email?: string;
    password?: string;
    user?: string;
  }) {
    this.email = user?.email;
    this.password = user?.password;
    this.name = user?.name;
    this.address = user?.address;
    this.country = user?.country;
    this.lastName = user?.lastName;
  }
}
