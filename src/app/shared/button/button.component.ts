import { Input, ElementRef, OnInit, Component, Renderer2 } from '@angular/core';
import { ButtonSize, ButtonType } from './button';

@Component({
  selector: '[alBtn]',
  styleUrls: ['./button.component.scss'],
  template: `
    <ng-content></ng-content>
  `
})
export class ButtonComponent implements OnInit {
  @Input('alBtn') private type: ButtonType = ButtonType.primary;

  @Input() private size: ButtonSize = ButtonSize.medium;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, `al-btn-${this.type}`);
    this.renderer.addClass(this.el.nativeElement, `al-btn-size-${this.size}`);
  }
}
