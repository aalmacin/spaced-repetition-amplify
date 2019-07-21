import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { AuthModule } from '../auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [AuthModule, CommonModule, MainRoutingModule]
})
export class MainModule {}
