import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { User } from '@spaced-repetition/types/user';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from '@spaced-repetition/types/card';
import { isTopicArr } from './topic.func';

interface TopicWithCards extends Topic {
  cards: Card[];
}

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
  topics: TopicWithCards[] = [];
  cards: Card[] = [];
  studyCards: Card[] = [];

  constructor(public authService: AuthService, public topicService: TopicService, public cardService: CardService) {
    this.subscriptions.add(
      combineLatest(
        this.authService.getCurrentUser(),
        this.topicService.getTopics(),
        this.cardService.getAllCards()
      ).subscribe(([user, topics, cards]) => {
        this.user = user;
        this.loading = false;
        this.cards = cards;
        this.topics = this.setTopicWithCards(topics, cards);
        this.studyCards = this.cards.filter(card => card.isReadyToStudy);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addNewTopic() {
    this.subscriptions.add(
      this.topicService.addTopic('Untitled').subscribe(result => {
        if (isTopicArr(result)) {
          this.topics = this.setTopicWithCards(result, this.cards);
        }
      })
    );
  }

  setTopicWithCards(topics: Topic[], cards: Card[]) {
    return topics.map(topic => ({
      ...topic,
      cards: cards.filter(card => card.topicId === topic.id)
    }));
  }
}
