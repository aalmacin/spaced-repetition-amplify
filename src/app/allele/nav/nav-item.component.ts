import { Component } from '@angular/core';

@Component({
  host: { '[class]': 'classes' },
  selector: '[al-nav-item]',
  styleUrls: ['./nav-item.component.scss'],
  template: `
    <ng-content class="content"></ng-content>
  `
})
export class NavItemComponent {
  public classes = 'al-nav-item al-tff-t al-lp-y-sm al-lm-r-md al-sc-white';
}
