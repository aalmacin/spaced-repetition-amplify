import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { DesignTokensComponent } from './design-tokens/design-tokens.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DesignTokensComponent,
  ],
  imports: [
    BrowserModule,
    AmplifyAngularModule,
    AppRoutingModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
