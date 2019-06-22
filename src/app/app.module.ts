import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TopicsComponent } from './topics/topics.component';
import { CardsComponent } from './cards/cards.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { FlashCardComponent } from './flash-card/flash-card.component';

import { MollyModule } from 'molly-component-library';
import { APIService } from './API.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, TopicsComponent, CardsComponent, FlashCardComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyAngularModule, MollyModule],
  providers: [AmplifyService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
