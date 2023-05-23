export class Message {
  date: Date;
  email: string;
  user: string;
  message: string;
  dateSent: string;

  constructor(message: {
    date: Date;
    email: string;
    user: string;
    message: string;
    dateSent: string;
  }) {
    this.date = message.date;
    this.dateSent = message.dateSent;
    this.email = message.email;
    this.user = message.user;
    this.message = message.message;
  }
}
