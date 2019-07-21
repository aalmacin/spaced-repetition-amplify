import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <div class="al-card al-tf-lg">
      <div
        class="al-sb-primary-light-x al-sb-primary-light-t al-sbg-primary-vdark al-sc-white al-tta-c al-lp-sm al-tff-h"
      >
        {{ heading }}
      </div>
      <div class="al-sb-primary-light-x al-sb-primary-light-t al-sbg-white al-tta-c al-lp-lg al-sb-n-b">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input()
  public heading = '';
}
