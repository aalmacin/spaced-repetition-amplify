import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';

import { AuthModule } from '../auth/auth.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';

import { StudyComponent } from './pages/study/study.component';

import { TopicsComponent } from './pages/topics/topics.component';

import { CardManagerComponent } from './pages/card-manager/card-manager.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashCardComponent } from './pages/study/flash-card/flash-card.component';
import { TopicFormComponent } from './pages/home/topic-form/topic-form.component';
import { CardInfoComponent } from './pages/home/card-info/card-info.component';
import { AddNewCardComponent } from './pages/home/add-new-card/add-new-card.component';
import { TopicSelectComponent } from './pages/home/topic-select/topic-select.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    StudyComponent,
    TopicsComponent,
    CardManagerComponent,
    FlashCardComponent,
    TopicFormComponent,
    CardInfoComponent,
    AddNewCardComponent,
    TopicSelectComponent
  ],
  imports: [AuthModule, CommonModule, FormsModule, ReactiveFormsModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
