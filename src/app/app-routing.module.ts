import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'home',
    loadChildren: './landing-pages/landing-pages.module#LandingPagesModule'
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
