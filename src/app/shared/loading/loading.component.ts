import { Component, Input } from '@angular/core';
import { LoadingType } from './loading';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading al-loading-{{ type }}">
      <i class="fas fa-spinner"></i>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input()
  public type = LoadingType.primary;
}
