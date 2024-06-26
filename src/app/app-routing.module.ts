import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';
import { UserLoggedGuard } from './guards/user-logged.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [UserLoggedGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/users/user.module').then((m) => m.UserModule),
    canActivate: [UserLoggedGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./pages/games/games.module').then((m) => m.GamesModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'surveys',
    loadChildren: () =>
      import('./pages/surveys/surveys.module').then((m) => m.SurveysModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'scores',
    loadChildren: () =>
      import('./pages/scores/scores.module').then((m) => m.ScoresModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'surveylist',
    loadChildren: () =>
      import('./pages/survey-list/survey-list.module').then(
        (m) => m.SurveyListModule
      ),
    canActivate: [AuthorizationGuard, AdminGuard],
  },

  {
    path: '**',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
