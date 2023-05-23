export class Survey {
  email: string;
  name: string;
  lastName: string;
  age: number;
  question: Question[];
}

export class Question {
  question: string;
  response: string;
}
