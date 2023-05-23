import { Component } from '@angular/core';
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
      .subscribe((surveys: any) => (this.surveyList = surveys));
  }
}
