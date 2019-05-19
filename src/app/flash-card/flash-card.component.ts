import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  template: `
  <div>
    <h2>{{ topic }}</h2>
    <div>
      {{ front }}
    </div>
    <div>
      {{ back }}
    </div>
  </div>
  `,
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent {
  @Input()
  topic = '';

  @Input()
  front = '';

  @Input()
  back = '';
}
