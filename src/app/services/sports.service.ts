import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class SportsService {
  private url: string;
  constructor(private readonly httpClient: HttpClient) {
    this.url = 'https://apiv2.allsportsapi.com/football/?&met=';
  }

  public getTeamByName(name: string) {
    const host = `${this.url}Teams&teamName=${name}&APIkey=${environment.soportsApi.apiKey}`;
    return this.httpClient.get(host);
  }
}
