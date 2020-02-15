import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TopicWithCards } from '@spaced-repetition/types/topic';
import { Store, select } from '@ngrx/store';
import { AppState, selectLoadedTopicIds } from '@spaced-repetition/reducers';
import { Subscription } from 'rxjs';
import { LoadCardsForTopic } from '@spaced-repetition/topic.actions';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit, OnDestroy {
  @Input()
  topicWithCards: TopicWithCards[] = [];

  loadedTopics = [];
  subscriptions = new Subscription();

  private constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectLoadedTopicIds)).subscribe(loadedTopics => {
        this.loadedTopics = loadedTopics;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadTopic(topicId: string) {
    this.store.dispatch(new LoadCardsForTopic({ topicId, limit: 1000, page: 1 }));
  }
}
