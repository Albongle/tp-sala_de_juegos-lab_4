import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayormenorRoutingModule } from './mayormenor-routing.module';
import { MayormenorComponent } from './mayormenor.component';
import { LoadingModule } from '../../../components/loading/loading.module';

@NgModule({
  declarations: [MayormenorComponent],
  imports: [CommonModule, MayormenorRoutingModule, LoadingModule],
})
export class MayormenorModule {}
