import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { StudyComponent } from './pages/study/study.component';
import { CardManagerComponent } from './pages/card-manager/card-manager.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'study',
        component: StudyComponent
      },
      {
        path: 'card-manager',
        component: CardManagerComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
