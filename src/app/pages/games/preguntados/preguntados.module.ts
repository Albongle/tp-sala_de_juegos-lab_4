import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { LoadingModule } from '../../../components/loading/loading.module';

@NgModule({
  declarations: [PreguntadosComponent],
  imports: [CommonModule, PreguntadosRoutingModule, LoadingModule],
})
export class PreguntadosModule {}
