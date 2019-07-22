import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { StudyComponent } from './pages/study/study.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { CardManagerComponent } from './pages/card-manager/card-manager.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'study',
        component: StudyComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'topics',
        component: TopicsComponent
      },
      {
        path: 'card-manager',
        component: CardManagerComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
