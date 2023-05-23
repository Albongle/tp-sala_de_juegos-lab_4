import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoresRoutingModule } from './scores-routing.module';
import { ScoresComponent } from './scores.component';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [ScoresComponent],
  imports: [CommonModule, ScoresRoutingModule, TableModule],
})
export class ScoresModule {}
