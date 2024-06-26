import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Score } from 'src/app/models/score.model';
import { AlertService } from 'src/app/services/alert.service';
import { ScoreService } from 'src/app/services/score.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.scss'],
})
export class AdivinaElNumeroComponent implements OnInit, OnDestroy {
  private static scoreIncrement = 15;
  private static scoreDecrement = 5;
  private static scoreInitial = 0;
  private static attempsInitial = 0;
  private static maxAttempsInitial = 10;
  private secretNumber: number;
  protected loading: boolean;
  protected score: number;
  protected attemps: number;
  protected maxAttemps: number;
  protected playerNumber: number;
  protected formNumber: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly scoreService: ScoreService,
    private readonly formBuilder: FormBuilder
  ) {
    this.loading = true;
    this.score = AdivinaElNumeroComponent.scoreInitial;
    this.attemps = AdivinaElNumeroComponent.attempsInitial;
    this.maxAttemps = AdivinaElNumeroComponent.maxAttempsInitial;
    this.setSecretNumber();
    this.formNumber = this.formBuilder.group({
      number: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.endGame();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }

  private setSecretNumber() {
    const random = Math.floor(Math.random() * 100) + 1;
    this.secretNumber = random;
    console.log(this.secretNumber);
  }

  private restartGame() {
    setTimeout(() => {
      this.alertService.showAlert({
        icon: 'info',
        message: `Se asigno una nuevo nuemero secreto`,
        timer: 2000,
      });
      this.attemps = AdivinaElNumeroComponent.attempsInitial;
      this.setSecretNumber();
    }, 4000);
  }

  private setScore(result: boolean) {
    if (result) {
      this.score += AdivinaElNumeroComponent.scoreIncrement;
    } else {
      if (this.score - AdivinaElNumeroComponent.scoreDecrement < 0) {
        this.score = AdivinaElNumeroComponent.scoreInitial;
      } else {
        this.score -= AdivinaElNumeroComponent.scoreDecrement;
      }
    }
  }
  protected assertNumber() {
    if (this.formNumber.valid) {
      this.attemps++;
      const playerNumber = parseInt(this.formNumber.controls['number']?.value);
      this.formNumber.setValue({ number: '' });
      if (playerNumber > this.secretNumber) {
        this.alertService.showAlert({
          icon: 'info',
          message: `Se paso del numero secreto`,
          timer: 3000,
        });
      } else if (playerNumber < this.secretNumber) {
        this.alertService.showAlert({
          icon: 'info',
          message: `Falta para el numero secreto`,
          timer: 3000,
        });
      } else {
        this.showMessage(true);
        this.setScore(true);
      }

      if (this.attemps === this.maxAttemps) {
        this.showMessage(false);
        this.setScore(false);
      }
    } else {
      this.alertService.showAlert({
        icon: 'warning',
        message: 'Debe ingresar un numero',
      });
    }
  }

  protected endGame() {
    if (this.score > 0) {
      const email = this.userService.userLogged?.email;
      const score = new Score({
        email: email as string,
        game: 'Adivina el numero',
        date: new Date(),
        value: this.score,
      });

      this.scoreService.saveScoreInStore(score);
    }
  }

  private showMessage(result: boolean) {
    const messages: any = {
      '1': 'Usted es un Psíquico',
      '2': 'Excelente percepción',
      '3': 'Esto es suerte',
      '4': 'Excelente técnica',
      '5': 'Usted está en la media',
      '6': 'Falta técnica',
      default: 'Afortunado en el amor!!',
    };
    if (result) {
      const message = messages[this.attemps.toString()] ?? messages['default'];

      this.alertService.showAlert({
        icon: 'success',
        message: `${message}`,
        timer: 3000,
      });
    } else {
      this.alertService.showAlert({
        icon: 'error',
        message: `Se agotaron los intentos`,
        timer: 3000,
      });
    }
    this.restartGame();
  }
}
