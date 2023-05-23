import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyListRoutingModule } from './survey-list-routing.module';
import { SurveyListComponent } from './survey-list.component';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [SurveyListComponent],
  imports: [CommonModule, SurveyListRoutingModule, TableModule],
})
export class SurveyListModule {}
