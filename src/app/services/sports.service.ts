import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SportsService {
  private apiKey: string;
  private url: string;
  constructor(private readonly httpClient: HttpClient) {
    this.url = 'https://apiv2.allsportsapi.com/football/?&met=';
    this.apiKey =
      'f7c234341b025d433181162b7d5f7af06b727b34093e393ee8c36bfbf8b6c965';
  }

  public getTeamById(id: string) {
    const host = `${this.url}Teams&teamId=${id}APIkey=${this.apiKey}`;
    return this.httpClient.get(host);
  }
  public getLeagueByCountryId(countryId: string) {
    const host = `${this.url}Leagues&APIkey=${this.apiKey}&countryId=${countryId}`;
    return this.httpClient.get(host);
  }
}
