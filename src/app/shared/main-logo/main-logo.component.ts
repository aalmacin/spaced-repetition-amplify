import { Component, Input, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { MainLogoSize } from './main-logo';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss']
})
export class MainLogoComponent implements AfterViewInit {
  @Input()
  public size: MainLogoSize = MainLogoSize.medium;

  public constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.renderer.addClass(this.el.nativeElement, `al-size-${this.size}`);
  }
}
