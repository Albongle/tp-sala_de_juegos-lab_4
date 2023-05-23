import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from './adivina-el-numero.component';

const routes: Routes = [{ path: '', component: AdivinaElNumeroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdivinaElNumeroRoutingModule { }
