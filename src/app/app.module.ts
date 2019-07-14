import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TopicsComponent } from './topics/topics.component';
import { CardsComponent } from './cards/cards.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { APIService } from './API.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './user.service';
import { CardManagementComponent } from './main/card-management/card-management.component';
import { SpinnerComponent } from './main/spinner/spinner.component';
import { CardManagementItemComponent } from './main/card-management-item/card-management-item.component';
import { StudyComponent } from './study/study.component';
import { AddCardComponent } from './main/add-card/add-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlleleModule } from './allele/allele.module';

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
    StudyComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlleleModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AmplifyService, APIService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
