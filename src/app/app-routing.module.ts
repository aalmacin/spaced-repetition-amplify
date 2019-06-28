import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TopicsComponent } from './topics/topics.component';
import { CardsComponent } from './cards/cards.component';
import { CardManagementComponent } from './card-management/card-management.component';
import { StudyComponent } from './study/study.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'topics',
    component: TopicsComponent
  },
  {
    path: 'card-mgmt',
    component: CardManagementComponent
  },
  {
    path: 'study',
    component: StudyComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'cards/:topicid',
    component: CardsComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
