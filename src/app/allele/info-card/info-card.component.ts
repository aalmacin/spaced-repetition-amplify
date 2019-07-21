import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-info-card',
  styleUrls: ['./info-card.component.scss'],
  template: `
    <div class="info-card al-sb-secondary al-lp-x-lg al-lp-t-vs al-tlh-s al-lp-b-lg al-lf al-lf-fd-c al-lf-jc-sb">
      <h3 class="al-lm-b-md">{{ heading }}</h3>

      <div class="card-img">
        <ng-content select="img"></ng-content>
      </div>

      <div class="card-content">
        <ng-content></ng-content>
      </div>

      <div class="card-btn al-tta-c">
        <ng-content select="[alBtn]"></ng-content>
      </div>
    </div>
  `
})
export class InfoCardComponent {
  @Input()
  public heading = '';
}
