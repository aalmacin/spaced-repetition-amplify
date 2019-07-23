import { Component, Input, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { LinkType, LinkColor } from './link';

@Component({
  selector: 'a[alLink]',
  template: `
    <ng-content></ng-content>
    <div class="moving-border"></div>
  `,
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements AfterViewInit {
  @Input('alLink')
  private type: LinkType = LinkType.animated;

  @Input()
  private color: LinkColor = LinkColor.primary;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, `al-link-${this.type}`);
    this.renderer.addClass(this.el.nativeElement, `al-link-color-${this.color}`);
  }
}
