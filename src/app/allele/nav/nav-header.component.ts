import { Component } from '@angular/core';

@Component({
  host: { '[class]': 'classes' },
  selector: '[al-nav-header]',
  styles: [
    `
      :host {
        cursor: pointer;
      }

      :host ::ng-deep a {
        font-family: inherit;
        color: inherit;
        text-decoration: inherit;
      }
    `
  ],
  template: `
    <ng-content class="content"></ng-content>
  `
})
export class NavHeaderComponent {
  public classes = 'al-nav-header al-tf-lg al-tff-h al-lp-y-sm al-lm-r-md al-sc-white';
}
