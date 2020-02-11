import { Component, Input, Output, EventEmitter } from '@angular/core';

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
