import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from './link/link.component';
import { MainLogoComponent } from './main-logo/main-logo.component';
import { LoadingComponent } from './loading/loading.component';
import { AccordionComponent } from './accordion/accordion.component';
import { HeaderComponent } from './accordion/header/header.component';
import { BodyComponent } from './accordion/body/body.component';

@NgModule({
  declarations: [
    ButtonComponent,
    AlertComponent,
    FooterComponent,
    LinkComponent,
    MainLogoComponent,
    LoadingComponent,
    AccordionComponent,
    HeaderComponent,
    BodyComponent
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    AlertComponent,
    FooterComponent,
    LinkComponent,
    MainLogoComponent,
    LoadingComponent,
    AccordionComponent,
    HeaderComponent,
    BodyComponent
  ]
})
export class SharedModule {}
