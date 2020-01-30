import { Component, OnDestroy, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@spaced-repetition/types/user';
import { Card } from '@spaced-repetition/types/card';
import { AppState, selectUser, selectTopicWithCards, selectReadyToStudyCards } from '@spaced-repetition/reducers';
import { Store, select } from '@ngrx/store';
import { KEY_ESCAPE } from '@spaced-repetition/app.constants';
import { TopicWithCards } from '@spaced-repetition/types/topic';
import { AddTopic, FilterCards, LoadTopics } from '@spaced-repetition/topic.actions';
import { LoadStudyCards } from '@spaced-repetition/card.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  user: User;
  createTopicToggle = false;
  topicWithCards: TopicWithCards[] = [];
  cards: Card[] = [];
  studyCards: Card[] = [];
  addNewCard = false;

  constructor(private store: Store<AppState>) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case KEY_ESCAPE:
        this.addNewCard = false;
        break;
    }
  }

  ngOnInit() {
    this.store.dispatch(new LoadTopics());
    this.store.dispatch(new LoadStudyCards());
    this.subscriptions
      .add(
        this.store.pipe(select(selectUser)).subscribe(user => {
          this.user = user;
        })
      )
      .add(
        this.store.pipe(select(selectTopicWithCards)).subscribe(topics => {
          this.topicWithCards = topics;
        })
      )
      .add(
        this.store.pipe(select(selectReadyToStudyCards)).subscribe(studyCards => {
          this.studyCards = studyCards;
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addNewTopic() {
    this.store.dispatch(new AddTopic());
  }

  toggleAddNewCard() {
    this.addNewCard = !this.addNewCard;
  }

  closeAddNewCardModal() {
    this.addNewCard = false;
  }

  searchCards(searchStr: string) {
    this.store.dispatch(new FilterCards(searchStr));
  }
}
