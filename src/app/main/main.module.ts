import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, CardsComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
