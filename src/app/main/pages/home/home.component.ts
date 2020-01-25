import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { User } from '@spaced-repetition/types/user';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from '@spaced-repetition/types/card';
import {
  getTimestampFromDate,
  getCurrentTimestamp,
  getCurrentDate,
  getDateFormat
} from '@spaced-repetition/main/shared/timestamp.func';

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
  topics: Topic[] = [];
  cards: Card[] = [];
  studyCards: Card[] = [];
  nextStudy = '';

  constructor(public authService: AuthService, public topicService: TopicService, public cardService: CardService) {
    this.subscriptions.add(
      combineLatest(
        this.authService.getCurrentUser(),
        this.topicService.getTopics(),
        this.cardService.getAllCards()
      ).subscribe(([user, topics, cards]) => {
        this.user = user;
        this.loading = false;
        this.topics = topics;
        this.cards = cards;
        this.studyCards = this.cards
          .filter(card => card.isReadyToStudy)
          .sort((a, b) => {
            return (
              getTimestampFromDate(getDateFormat(b.nextStudyDate)) -
              getTimestampFromDate(getDateFormat(a.nextStudyDate))
            );
          });
        if (this.studyCards.length > 0) {
          const nextStudyCard = this.studyCards[0];
          const nextStudyTimestamp = getTimestampFromDate(nextStudyCard.nextStudyDate);
          if (nextStudyTimestamp <= getCurrentTimestamp()) {
            this.nextStudy = getCurrentDate();
          } else {
            this.nextStudy = getDateFormat(nextStudyCard.nextStudyDate);
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
