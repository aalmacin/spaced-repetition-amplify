import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'al-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input()
  expanded = false;

  @Output()
  expand = new EventEmitter();

  toggleExpandHandler() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.expand.emit('expanded');
    }
  }
}
