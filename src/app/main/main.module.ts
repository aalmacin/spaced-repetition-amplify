import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';

import { AuthModule } from '../auth/auth.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';

import { StudyComponent } from './pages/study/study.component';

import { CardManagerComponent } from './pages/card-manager/card-manager.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashCardComponent } from './pages/study/flash-card/flash-card.component';
import { TopicFormComponent } from './pages/home/topic-form/topic-form.component';
import { CardInfoComponent } from './pages/home/card-info/card-info.component';
import { AddNewCardComponent } from './pages/home/add-new-card/add-new-card.component';
import { TopicSelectComponent } from './pages/home/topic-select/topic-select.component';
import { TopicsComponent } from './pages/home/topics/topics.component';
import { TopicComponent } from './pages/home/topic/topic.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    StudyComponent,
    CardManagerComponent,
    FlashCardComponent,
    TopicFormComponent,
    CardInfoComponent,
    AddNewCardComponent,
    TopicSelectComponent,
    TopicsComponent,
    TopicComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class MainModule {}
