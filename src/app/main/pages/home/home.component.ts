import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { User } from '@spaced-repetition/types/user';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic, TopicWithCards } from '@spaced-repetition/types/topic';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from '@spaced-repetition/types/card';
import { isTopicArr } from './topic.func';
import { AppState, selectTopics, selectUser } from '@spaced-repetition/reducers';
import { Store, select } from '@ngrx/store';
import { KEY_ESCAPE } from '@spaced-repetition/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  subscriptions = new Subscription();
  user: User;
  createTopicToggle = false;
  loading = true;
  topicWithCards: TopicWithCards[] = [];
  cards: Card[] = [];
  studyCards: Card[] = [];
  addNewCard = false;

  constructor(
    public authService: AuthService,
    public topicService: TopicService,
    public cardService: CardService,
    private store: Store<AppState>
  ) {
    this.subscriptions.add(
      combineLatest(this.store.pipe(select(selectUser)), this.cardService.getAllTopicWithCards()).subscribe(
        ([user, topicWithCards]) => {
          this.user = user;
          this.loading = false;
          // this.cards = cards;
          this.topicWithCards = topicWithCards;
          this.studyCards = this.cards.filter(card => card.isReadyToStudy);
        }
      )
    );
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case KEY_ESCAPE:
        this.addNewCard = false;
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addNewTopic() {
    this.subscriptions.add(
      this.topicService.addTopic('Untitled').subscribe(result => {
        if (isTopicArr(result)) {
          this.topicWithCards = result;
        }
      })
    );
  }

  toggleAddNewCard() {
    this.addNewCard = !this.addNewCard;
  }

  closeAddNewCardModal() {
    this.addNewCard = false;
  }
}
