import { Component } from '@angular/core';

@Component({
  host: { '[class]': 'classes' },
  selector: 'nav[al-nav]',
  styleUrls: ['./nav.component.scss'],
  template: `
    <ng-content select="[al-nav-header]"></ng-content>
    <div class="al-nav-items">
      <ng-content select="[al-nav-item]"></ng-content>
    </div>
    <div class="al-nav-items-end">
      <ng-content select="[al-nav-item-end]"></ng-content>
    </div>
  `
})
export class NavComponent {
  public classes = 'al-nav al-sbg-primary-vdark al-lp-vs';
}
