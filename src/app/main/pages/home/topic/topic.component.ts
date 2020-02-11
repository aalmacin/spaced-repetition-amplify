import { Component, OnInit, Input } from '@angular/core';
import { TopicWithCards } from '@spaced-repetition/types/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  @Input()
  topic: TopicWithCards;
}
