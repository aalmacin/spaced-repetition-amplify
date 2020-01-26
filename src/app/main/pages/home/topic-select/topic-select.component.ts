import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Topic } from '@spaced-repetition/types/topic';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Subscription } from 'rxjs';
import { TopicService } from '@spaced-repetition/amplify/topic.service';

@Component({
  selector: 'app-topic-select',
  templateUrl: './topic-select.component.html',
  styleUrls: ['./topic-select.component.scss']
})
export class TopicSelectComponent implements OnInit, OnDestroy {
  @Input()
  card: Card;

  topics: Topic[];

  @Output()
  changeTopic = new EventEmitter<string>();

  subscriptions = new Subscription();

  constructor(public topicService: TopicService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.topicService.getTopics().subscribe(topics => {
        this.topics = topics;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateTopic(e) {
    this.changeTopic.emit(e.target.value);
  }
}
