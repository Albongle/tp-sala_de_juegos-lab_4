import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Score } from 'src/app/models/score.model';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
  protected listScores: Score[];
  constructor(private readonly scoreService: ScoreService) {
    this.scoreService
      .getAllScores()
      .pipe(
        map((data: any) => {
          return data.map((score: Score) => {
            return {
              Fecha: new Date(score.date).toLocaleDateString(),
              Juego: score.game,
              Score: score.value,
              Usuario: score.email,
            };
          });
        })
      )
      .subscribe((score: any) => {
        this.listScores = score;
      });
  }
}
