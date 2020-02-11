import { Component, Input } from '@angular/core';
import { TopicWithCards } from '@spaced-repetition/types/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  @Input()
  topicWithCards: TopicWithCards[] = [];

  loadedTopics = [];

  loadTopic(topicId: string) {
    if (!this.loadedTopics.includes(topicId)) {
      this.loadedTopics.push(topicId);
    }
  }
}
