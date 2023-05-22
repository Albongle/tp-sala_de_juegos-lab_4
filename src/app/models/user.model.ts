import { Country } from './contry.model';
export class User {
  userId?: string;
  name?: string;
  lastName?: string;
  address?: string;
  country?: Country;
  email?: string;
  password?: string;
  user?: string;
  constructor(user?: {
    userId?: string;
    name?: string;
    lastName?: string;
    address?: string;
    country?: Country;
    email?: string;
    password?: string;
    user?: string;
  }) {
    this.userId = user?.userId ?? 'n/a';
    this.email = user?.email ?? 'n/a';
    this.password = user?.password ?? 'n/a';
    this.name = user?.name ?? 'n/a';
    this.address = user?.address ?? 'n/a';
    this.country = user?.country;
    this.lastName = user?.lastName ?? 'n/a';
  }
}
