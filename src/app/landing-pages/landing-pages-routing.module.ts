import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignTokensComponent } from './design-tokens/design-tokens.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'design-tokens',
        component: DesignTokensComponent
      },
      {
        path: 'landing',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule {}
