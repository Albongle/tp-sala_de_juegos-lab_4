export class Score {
  userId: string;
  game: string;
  date: Date;
  value: number;

  constructor(score: {
    userId: string;
    game: string;
    date: Date;
    value: number;
  }) {
    this.userId = score.userId;
    this.date = score.date;
    this.game = score.game;
    this.value = score.value;
  }
}
