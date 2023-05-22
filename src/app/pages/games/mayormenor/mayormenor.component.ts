import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.scss'],
})
export class MayormenorComponent implements OnInit {
  private static scoreIncrement = 15;
  private static scoreDecrement = 5;
  private static scoreInitial = 0;
  protected loading: boolean;
  protected secretImage: string;
  protected playerImage: string;
  protected secretValue: number;
  protected playerValue: number;
  protected actionResultImage: string;
  protected actionResult: boolean;
  protected showResult: boolean;
  protected score: number;
  constructor() {
    this.loading = true;
    this.score = MayormenorComponent.scoreInitial;
    this.actionResult = true;
    this.showResult = false;
    this.actionResultImage =
      '../../../../assets/images/games/mayormenor/true.png';
    this.assingPlayerImage();
    this.assingSecretImage();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }

  private assingPlayerImage(value?: number) {
    if (!value) {
      value = Math.floor(Math.random() * 12) + 1;
    }

    this.playerImage = `../../../../assets/images/games/mayormenor/naipes/naipe_${value}.png`;
    this.playerValue = value;
  }

  private assingSecretImage() {
    const random = Math.floor(Math.random() * 12) + 1;
    this.secretImage = `../../../../assets/images/games/mayormenor/naipes/naipe_0.png`;
    this.secretValue = random;
  }

  private assertValue(result: boolean) {
    this.actionResult = result;
    this.showResult = !this.showResult;
    this.actionResultImage = `../../../../assets/images/games/mayormenor/${this.actionResult}.png`;
    this.secretImage = `../../../../assets/images/games/mayormenor/naipes/naipe_${this.secretValue}.png`;
    this.restartGame();
    this.setScore(result);
  }

  protected isBigger() {
    this.assertValue(this.secretValue > this.playerValue);
  }
  protected isSmaller() {
    this.assertValue(this.secretValue < this.playerValue);
  }

  private restartGame() {
    setTimeout(() => {
      this.showResult = !this.showResult;
      this.assingPlayerImage(this.secretValue);
      this.assingSecretImage();
    }, 2000);
  }
  private setScore(result: boolean) {
    if (result) {
      this.score += MayormenorComponent.scoreIncrement;
    } else {
      if (this.score - MayormenorComponent.scoreDecrement < 0) {
        this.score = MayormenorComponent.scoreInitial;
      } else {
        this.score -= MayormenorComponent.scoreDecrement;
      }
    }
  }
}
