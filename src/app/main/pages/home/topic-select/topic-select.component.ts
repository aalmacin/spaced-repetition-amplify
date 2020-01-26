import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Topic } from '@spaced-repetition/types/topic';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectTopics } from '@spaced-repetition/reducers';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectTopics)).subscribe(topics => {
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
