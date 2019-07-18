import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { DesignTokensComponent } from './design-tokens/design-tokens.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'design-tokens',
    component: DesignTokensComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
    data: { preload: true }
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
