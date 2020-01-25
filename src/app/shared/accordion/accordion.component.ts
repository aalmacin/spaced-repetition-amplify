import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'al-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input()
  expanded = false;

  toggleExpandHandler() {
    this.expanded = !this.expanded;
  }
}
