import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';

import { AuthModule } from '../auth/auth.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';

import { StudyComponent } from './pages/study/study.component';

import { ProfileComponent } from './pages/profile/profile.component';

import { TopicsComponent } from './pages/topics/topics.component';

import { CardManagerComponent } from './pages/card-manager/card-manager.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashCardComponent } from './pages/study/flash-card/flash-card.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    StudyComponent,
    ProfileComponent,
    TopicsComponent,
    CardManagerComponent,
    FlashCardComponent
  ],
  imports: [AuthModule, CommonModule, FormsModule, ReactiveFormsModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
