import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DesignTokensComponent } from './design-tokens/design-tokens.component';
import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavComponent } from './nav/nav.component';
import { AuthModule } from '@spaced-repetition/auth/auth.module';
import { SharedModule } from '@spaced-repetition/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NavComponent, DesignTokensComponent, LandingPageComponent],
  imports: [CommonModule, AuthModule, LandingPagesRoutingModule, SharedModule],
  exports: [HomeComponent, DesignTokensComponent]
})
export class LandingPagesModule {}
