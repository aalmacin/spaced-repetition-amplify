import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TopicsComponent } from './topics/topics.component';
import { CardsComponent } from './cards/cards.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { MollyModule } from 'molly-component-library';
import { APIService } from './API.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './user.service';
import { CardManagementComponent } from './card-management/card-management.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardManagementItemComponent } from './card-management-item/card-management-item.component';
import { StudyComponent } from './study/study.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    TopicsComponent,
    CardsComponent,
    CardManagementComponent,
    SpinnerComponent,
    CardManagementItemComponent,
    StudyComponent
  ],
  imports: [BrowserModule, AppRoutingModule, AmplifyAngularModule, MollyModule, BrowserAnimationsModule],
  providers: [AmplifyService, APIService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
