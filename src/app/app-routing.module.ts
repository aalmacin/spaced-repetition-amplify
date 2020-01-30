import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: 'auth/signin'
  },
  {
    path: 'app',
    pathMatch: 'full',
    redirectTo: 'app/home'
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: 'home/landing'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'app',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'home',
    loadChildren: './landing-pages/landing-pages.module#LandingPagesModule'
  },
  {
    path: '',
    redirectTo: 'home/landing',
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
