export class Score {
  email: string;
  game: string;
  date: Date;
  value: number;

  constructor(score: {
    email: string;
    game: string;
    date: Date;
    value: number;
  }) {
    this.email = score.email;
    this.date = score.date;
    this.game = score.game;
    this.value = score.value;
  }
}
