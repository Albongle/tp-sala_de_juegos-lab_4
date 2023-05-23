import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdivinaElNumeroRoutingModule } from './adivina-el-numero-routing.module';
import { AdivinaElNumeroComponent } from './adivina-el-numero.component';
import { LoadingModule } from '../../../components/loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdivinaElNumeroComponent],
  imports: [
    CommonModule,
    AdivinaElNumeroRoutingModule,
    LoadingModule,
    ReactiveFormsModule,
  ],
})
export class AdivinaElNumeroModule {}
