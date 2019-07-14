import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ButtonType, ButtonSize } from './button';

@Directive({
  selector: '[alBtn]'
})
export class ButtonDirective implements OnInit {
  @Input()
  public type = ButtonType.DEFAULT;

  @Input()
  public size = ButtonSize.LARGE;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  public ngOnInit(): void {
    const btnType = `al-c-btn-${this.type}`;
    const btnSize = `al-c-btn-size-${this.size}`;

    this.renderer.addClass(this.hostElement.nativeElement, btnType);
    this.renderer.addClass(this.hostElement.nativeElement, btnSize);
  }
}
