import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-img-jumbotron',
  styleUrls: ['./image-jumbotron.component.scss'],
  template: `
    <div class="{{ textLeft ? 'al-lf-fd-r' : 'al-lf-fd-rr' }} al-lf al-sbg-secondary-vlight">
      <div class="al-lf al-lf-jc-sb al-lf-fd-c al-lp-lg al-lw-60">
        <h3>{{ heading }}</h3>
        <p>
          {{ text }}
        </p>
        <a alBtn class="al-tta-c" *ngIf="actionText" type="primary" [href]="actionUrl">{{ actionText }}</a>
      </div>
      <img class="al-lf al-lw-40" [src]="imgSrc" alt="An image" />
    </div>
  `
})
export class ImageJumbotronComponent {
  @Input()
  public heading = '';

  @Input()
  public imgSrc = '';

  @Input()
  public text = '';

  @Input()
  public textLeft = true;

  @Input()
  public actionText = '';

  @Input()
  public actionUrl = '';
}
