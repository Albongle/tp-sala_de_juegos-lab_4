import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss'],
})
export class AhorcadoComponent {
  protected keyBoard: string[];
  protected attemps: number;
  protected maxAttemps: number;
  protected score: number;
  protected secretWord: string[];
  protected playerWord: string[];
  private words: string[] = [
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
    private readonly alertService: AlertService
  ) {
    this.keyBoard = [];
    this.attemps = 0;
    this.maxAttemps = 6;
    this.score = 0;
    this.createKeyboard();
    this.assignSecretWord();
  }

  private createKeyboard() {
    for (let index = 65; index < 91; index++) {
      this.keyBoard.push(String.fromCharCode(index));
    }
  }
  private assignSecretWord() {
    const random = Math.floor(Math.random() * this.words.length);
    this.secretWord = this.words[random].split('');
    this.playerWord = this.words[random].split('');
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
      this.attemps = 0;
      this.assignSecretWord();
    }, 4000);
  }
  private setScore(result: boolean) {
    if (result) {
      this.score += 15;
    } else {
      if (this.score - 5 < 0) {
        this.score = 0;
      } else {
        this.score -= 5;
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
}
