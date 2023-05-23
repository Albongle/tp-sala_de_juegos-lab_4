import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyListRoutingModule } from './survey-list-routing.module';
import { SurveyListComponent } from './survey-list.component';
import { ListModule } from 'src/app/components/list/list.module';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [CommonModule, SurveyListRoutingModule, ListModule],
})
export class SurveyListModule {}
