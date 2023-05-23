import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoresRoutingModule } from './scores-routing.module';
import { ScoresComponent } from './scores.component';
import { ListModule } from 'src/app/components/list/list.module';

@NgModule({
  declarations: [ScoresComponent],
  imports: [CommonModule, ScoresRoutingModule, ListModule],
})
export class ScoresModule {}
