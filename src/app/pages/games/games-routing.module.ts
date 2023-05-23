import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  {
    path: 'ahorcado',
    loadChildren: () =>
      import('./ahorcado/ahorcado.module').then((m) => m.AhorcadoModule),
  },
  {
    path: 'mayormenor',
    loadChildren: () =>
      import('./mayormenor/mayormenor.module').then((m) => m.MayormenorModule),
  },
  {
    path: 'preguntados',
    loadChildren: () =>
      import('./preguntados/preguntados.module').then(
        (m) => m.PreguntadosModule
      ),
  },
  {
    path: 'adivinaelnumero',
    loadChildren: () =>
      import('./adivina-el-numero/adivina-el-numero.module').then(
        (m) => m.AdivinaElNumeroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
