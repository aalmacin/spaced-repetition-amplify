import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Topic } from '@spaced-repetition/types/topic';
import { select, Store } from '@ngrx/store';
import { selectTopics, AppState } from '@spaced-repetition/reducers';
import { LoadCardsForTopic } from '@spaced-repetition/topic.actions';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnInit, OnDestroy {
  filteredCards: BehaviorSubject<Card[]> = new BehaviorSubject([]);
  subscriptions: Subscription = new Subscription();

  isReadyStudyOnly = false;

  errors: string[] = [];
  messages: string[] = [];
  topics: Topic[] = [];
  searchTerm = '';

  @Input()
  totalCardCount = 0;

  @Input()
  topicId = '';

  @Input()
  cards: Card[] = [];

  limit = 10;

  page = 1;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.topicId) {
      this.subscriptions.add(
        this.store.pipe(select(selectTopics)).subscribe(topics => {
          this.topics = topics;
        })
      );
    }
    this.store.dispatch(new LoadCardsForTopic({ topicId: this.topicId, limit: this.limit, page: 1 }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  pageChanged(n: number) {
    this.page = n;
    this.store.dispatch(new LoadCardsForTopic({ topicId: this.topicId, limit: this.limit, page: this.page }));
  }
}
