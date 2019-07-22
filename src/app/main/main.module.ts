import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudyComponent } from './pages/study/study.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { CardManagerComponent } from './pages/card-manager/card-manager.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    StudyComponent,
    ProfileComponent,
    TopicsComponent,
    CardManagerComponent
  ],
  imports: [AuthModule, CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
