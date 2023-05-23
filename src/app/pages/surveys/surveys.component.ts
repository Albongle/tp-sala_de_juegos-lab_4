import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

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
    private readonly userService: UserService
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
    console.log(this.formSurvey.controls['find'].value);
    if (this.formSurvey.valid) {
      this.alertService.showAlert({
        icon: 'success',
        message: 'Todo Ok',
      });
    } else {
      this.alertService.showAlert({
        icon: 'error',
        message: 'Debe completar el formulario',
      });
    }
  }
}
