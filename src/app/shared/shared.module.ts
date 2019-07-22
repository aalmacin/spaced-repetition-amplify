import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ButtonComponent, AlertComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, AlertComponent]
})
export class SharedModule {}
