export class Survey {
  date: Date;
  email: string;
  name: string;
  lastName: string;
  age: number;
  questions: Question[];

  constructor(survey: {
    date: Date;
    email: string;
    name: string;
    lastName: string;
    age: number;
    questions: Question[];
  }) {
    this.date = survey.date;
    this.email = survey.email;
    this.name = survey.name;
    this.lastName = survey.lastName;
    this.age = survey.age;
    this.questions = survey.questions;
  }
}

export class Question {
  question: string;
  response: string;

  constructor(question: { question: string; response: string }) {
    this.question = question.question;
    this.response = question.response;
  }
}
