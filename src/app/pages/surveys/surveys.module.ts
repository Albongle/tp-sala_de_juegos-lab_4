import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SurveysComponent],
  imports: [CommonModule, SurveysRoutingModule, ReactiveFormsModule],
})
export class SurveysModule {}
