import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from './alert';

@Component({
  selector: 'al-alert',
  template: `
    <div [class]="'alert-container alert-type-' + type" *ngIf="messages.length > 0">
      <p class="alert" *ngFor="let message of messages">
        <i [class]="icon"></i> <span class="alert__msg">{{ message }}</span>
      </p>
    </div>
  `,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input()
  public type = AlertType.error;

  @Input()
  public messages: string[] = [];

  private iconLookup = {
    [AlertType.error]: 'fas fa-exclamation-triangle',
    [AlertType.success]: 'fas fa-check-circle'
  };

  public icon = this.iconLookup[this.type];
}
