import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [ButtonComponent, AlertComponent, FooterComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, AlertComponent, FooterComponent]
})
export class SharedModule {}
