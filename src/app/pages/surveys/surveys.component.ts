import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question, Survey } from 'src/app/models/survey.model';
import { AlertService } from 'src/app/services/alert.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
})
export class SurveysComponent {
  protected formSurvey: FormGroup;
  protected optionExperience: number[];
  protected optionGame: string[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly surveyService: SurveyService
  ) {
    this.optionExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.optionGame = [
      'Adivina el numero',
      'Ahorcado',
      'Preguntados',
      'Mayor o Menor',
    ];
    this.formSurvey = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      experience: ['', [Validators.required, Validators.minLength(1)]],
      preference: ['', [Validators.required, Validators.minLength(1)]],
      find: ['', Validators.required],
    });
  }
  public sendSurvey() {
    try {
      this.validateForm();
      this.surveyService.saveSurveyInStore(this.getSurvey());
      this.alertService.showAlert({
        icon: 'success',
        message: 'Registro completado con exito, gracias por participar',
      });
    } catch (error: any) {
      this.alertService.showAlert({
        icon: 'error',
        message: error.message,
      });
    }
    this.formSurvey.reset();
  }
  private getSurvey() {
    return new Survey({
      date: new Date(),
      email: this.formSurvey.controls['email'].value,
      name: this.formSurvey.controls['name'].value,
      lastName: this.formSurvey.controls['lastName'].value,
      age: this.formSurvey.controls['age'].value,
      questions: this.getQuestions(),
    });
  }

  private getQuestions() {
    const questions: Question[] = [
      new Question({
        question: 'Experiencia',
        response: this.formSurvey.controls['experience'].value,
      }),
      new Question({
        question: 'Juego Preferido',
        response: this.formSurvey.controls['preference'].value,
      }),
      new Question({
        question: 'Donde nos encontraste',
        response: this.formSurvey.controls['find'].value,
      }),
    ];

    return questions;
  }

  private validateForm() {
    if (this.formSurvey.invalid) {
      throw new Error('Debe completar los datos para el registro');
    }
  }
}
