import { Component, OnDestroy, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score.model';
import { AlertService } from 'src/app/services/alert.service';
import { ScoreService } from 'src/app/services/score.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent implements OnInit, OnDestroy {
  private static scoreIncrement = 15;
  private static scoreDecrement = 5;
  private static scoreInitial = 0;
  private static attempsInitial = 0;
  private static maxAttempsInitial = 6;
  protected loading: boolean;
  protected keyBoard: string[];
  protected attemps: number;
  protected maxAttemps: number;
  protected score: number;
  protected secretWord: string[];
  protected playerWord: string[];
  private static words: string[] = [
    'MANZANA',
    'PERRO',
    'GATO',
    'COCHE',
    'PLAYA',
    'COMPUTADORA',
    'PROGRAMACION',
    'LABORATORIO',
    'LIBRO',
    'BICICLETA',
    'PELICULA',
    'AVION',
    'JUEGO',
    'MUSICA',
    'FAMILIA',
    'AMIGO',
    'CIUDAD',
    'VIAJE',
    'FUTBOL',
    'GUITARRA',
  ];
  protected image: string;
  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly scoreService: ScoreService
  ) {
    this.loading = true;
    this.keyBoard = [];
    this.attemps = AhorcadoComponent.attempsInitial;
    this.maxAttemps = AhorcadoComponent.maxAttempsInitial;
    this.score = AhorcadoComponent.scoreInitial;
    this.createKeyboard();
    this.assignSecretWord();
  }
  ngOnDestroy(): void {
    this.endGame();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }

  private createKeyboard() {
    for (let index = 65; index < 91; index++) {
      this.keyBoard.push(String.fromCharCode(index));
    }
  }
  private assignSecretWord() {
    const random = Math.floor(Math.random() * AhorcadoComponent.words.length);
    this.secretWord = AhorcadoComponent.words[random].split('');
    this.playerWord = AhorcadoComponent.words[random].split('');
    this.mapPlayerWord('_');
    this.setImage();
  }

  protected assertLetter(key: string) {
    if (!this.secretWord.includes(key)) {
      this.attemps++;
    } else {
      this.replacePlayerWord(key);
    }
    this.validateResult();
    this.setImage();
  }

  private setImage() {
    this.image = `../../../../assets/images/games/ahorcado/ahorcado_resultado_${this.attemps}.jpg`;
  }
  private validateResult() {
    const playerWord = this.playerWord.join('');
    const secretWord = this.secretWord.join('');
    if (this.attemps === this.maxAttemps) {
      this.showMessage(false, secretWord);
      this.setScore(false);
      this.restartGame();
    } else if (playerWord === secretWord) {
      this.showMessage(true, secretWord);
      this.setScore(true);
      this.restartGame();
    }
  }
  private mapPlayerWord(character: string) {
    const length = this.playerWord.length - 1;
    this.playerWord.fill(character, 1, length);
  }

  private replacePlayerWord(character: string) {
    this.secretWord.forEach((value, index) => {
      if (value === character) {
        this.playerWord[index] = character;
      }
    });
  }
  private restartGame() {
    setTimeout(() => {
      this.alertService.showAlert({
        icon: 'info',
        message: `Se asigno una nueva palabra`,
        timer: 2000,
      });
      this.attemps = AhorcadoComponent.attempsInitial;
      this.assignSecretWord();
    }, 4000);
  }
  private setScore(result: boolean) {
    if (result) {
      this.score += AhorcadoComponent.scoreIncrement;
    } else {
      if (this.score - AhorcadoComponent.scoreDecrement < 0) {
        this.score = AhorcadoComponent.scoreInitial;
      } else {
        this.score -= AhorcadoComponent.scoreDecrement;
      }
    }
  }

  private showMessage(result: boolean, secretWord: string) {
    if (result) {
      this.alertService.showAlert({
        icon: 'success',
        message: `Felicitaciones, la palabra secreta era ${secretWord}`,
        timer: 3000,
      });
    } else {
      this.alertService.showAlert({
        icon: 'warning',
        message: `Se agotaron los intentos, la palabra secreta era ${secretWord}`,
        timer: 3000,
      });
    }
  }

  protected endGame() {
    if (this.score > 0) {
      const email = this.userService.userLogged?.email;
      const score = new Score({
        email: email as string,
        game: 'Ahorcado',
        date: new Date(),
        value: this.score,
      });

      this.scoreService.saveScoreInStore(score);
    }
  }
}
