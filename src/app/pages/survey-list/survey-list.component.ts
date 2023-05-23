import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent {
  protected surveyList: Survey[];

  constructor(private readonly surveyService: SurveyService) {
    this.surveyService
      .getAllSurveys()
      .pipe(
        map((data: any) => {
          return data.map((survey: Survey) => {
            return {
              Email: survey.email,
              Fecha: new Date(survey.date).toLocaleDateString(),
              Nombre: survey.name,
              Apellido: survey.lastName,
              Preguntas: survey.questions.reduce(
                (acum, curr) =>
                  (acum = `"${curr.question}: ${curr.response}"\n` + acum),
                ''
              ),
            };
          });
        })
      )
      .subscribe((surveys: any) => (this.surveyList = surveys));
  }
}
