import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayormenorRoutingModule } from './mayormenor-routing.module';
import { MayormenorComponent } from './mayormenor.component';


@NgModule({
  declarations: [
    MayormenorComponent
  ],
  imports: [
    CommonModule,
    MayormenorRoutingModule
  ]
})
export class MayormenorModule { }
