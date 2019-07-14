import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button/button.directive';
import { CardComponent } from './card/card.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { ImageJumbotronComponent } from './jumbotron/image-jumbotron.component';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav/nav-item.component';
import { NavHeaderComponent } from './nav/nav-header.component';

@NgModule({
  declarations: [
    ButtonDirective,
    CardComponent,
    FlashCardComponent,
    InfoCardComponent,
    ImageJumbotronComponent,
    NavComponent,
    NavHeaderComponent,
    NavItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    ButtonDirective,
    CardComponent,
    FlashCardComponent,
    InfoCardComponent,
    ImageJumbotronComponent,
    NavComponent,
    NavHeaderComponent,
    NavItemComponent
  ]
})
export class AlleleModule {}
