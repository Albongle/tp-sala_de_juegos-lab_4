import { Component, OnDestroy, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score.model';
import { AlertService } from 'src/app/services/alert.service';
import { ScoreService } from 'src/app/services/score.service';
import { SportsService } from 'src/app/services/sports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  private static scoreIncrement = 15;
  private static scoreDecrement = 5;
  private static scoreInitial = 0;
  protected loading: boolean;
  protected score: number;
  protected secretImage: string;
  protected secretTeam: string;
  protected availableResponses: string[];
  private static listTeams: string[] = [
    'Boca Juniors',
    'River Plate',
    'PSG',
    'Barcelona',
    'Real Madrid',
    'Independiente',
    'Racing Club',
    'Argentinos Juniors',
    'Atletico Madrid',
    'Gremio',
    'Platense',
    'Godoy Cruz',
    'Banfield',
    'Lanus',
    'Rosario Central',
    'Temperley',
    'Patronato',
    'Boca Unidos',
    'Los Andes',
    'Atlanta',
  ];

  constructor(
    private readonly sportsServices: SportsService,
    private readonly alertService: AlertService,
    private readonly userService: UserService,
    private readonly scoreService: ScoreService
  ) {
    this.loading = true;
    this.score = 0;
    this.setDefaulImage();
    this.assignNewTeam();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }
  ngOnDestroy(): void {
    this.endGame();
  }

  public setImage(team: string) {
    this.sportsServices.getTeamByName(team).subscribe((data: any) => {
      this.secretImage = data.result[0].team_logo;
    });
  }

  protected assertTeam(team: string) {
    const result = this.secretTeam === team;
    this.showMessage(result);
    this.setScore(result);
    this.restartGame();
  }

  private assignNewTeam() {
    const random = Math.floor(
      Math.random() * PreguntadosComponent.listTeams.length
    );
    this.secretTeam = PreguntadosComponent.listTeams[random];
    this.setImage(this.secretTeam);
    this.setAvailableResponses();
  }

  private setAvailableResponses() {
    const countElements = 3;
    const listAux = PreguntadosComponent.listTeams.filter(
      (t) => t !== this.secretTeam
    );
    const random = Math.floor(Math.random() * (listAux.length - countElements));
    this.availableResponses = listAux.slice(random, random + countElements);
    this.availableResponses.push(this.secretTeam);
    this.availableResponses.sort();
  }

  private showMessage(result: boolean) {
    if (result) {
      this.alertService.showAlert({
        icon: 'success',
        message: `Felicitaciones adivinaste`,
        timer: 3000,
      });
    } else {
      this.alertService.showAlert({
        icon: 'error',
        message: `La proxima sera, el equipo era ${this.secretTeam} `,
        timer: 3000,
      });
    }
    this.setDefaulImage();
  }

  private restartGame() {
    setTimeout(() => {
      this.alertService.showAlert({
        icon: 'info',
        message: `Se asigno un nuevo equipo`,
        timer: 2000,
      });

      this.assignNewTeam();
    }, 4000);
  }
  private setDefaulImage() {
    this.secretImage = `../../../../assets/images/games/preguntados/escudo_base.png`;
  }
  private setScore(result: boolean) {
    if (result) {
      this.score += PreguntadosComponent.scoreIncrement;
    } else {
      if (this.score - PreguntadosComponent.scoreDecrement < 0) {
        this.score = PreguntadosComponent.scoreInitial;
      } else {
        this.score -= PreguntadosComponent.scoreDecrement;
      }
    }
  }

  protected endGame() {
    if (this.score > 0) {
      const email = this.userService.userLogged?.email;
      const score = new Score({
        email: email as string,
        game: 'Preguntados',
        date: new Date(),
        value: this.score,
      });

      this.scoreService.saveScoreInStore(score);
    }
  }
}
