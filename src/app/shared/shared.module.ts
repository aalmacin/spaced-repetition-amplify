import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { LinkComponent } from './link/link.component';
import { MainLogoComponent } from './main-logo/main-logo.component';
import { LoadingComponent } from './loading/loading.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    ButtonComponent,
    AlertComponent,
    FooterComponent,
    LinkComponent,
    MainLogoComponent,
    LoadingComponent,
    CheckboxComponent
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    AlertComponent,
    FooterComponent,
    LinkComponent,
    MainLogoComponent,
    LoadingComponent,
    CheckboxComponent
  ]
})
export class SharedModule {}
