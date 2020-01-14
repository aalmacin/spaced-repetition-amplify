import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AuthModule } from './auth/auth.module';
import { LandingPagesModule } from './landing-pages/landing-pages.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, AmplifyAngularModule, AppRoutingModule, LandingPagesModule, AuthModule],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
