import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnInit, OnDestroy {
  filteredCards: BehaviorSubject<Card[]> = new BehaviorSubject([]);
  subscriptions: Subscription = new Subscription();
  loading = true;

  isReadyStudyOnly = false;

  errors: string[] = [];
  messages: string[] = [];
  topics: Topic[] = [];
  searchTerm = '';

  @Input()
  topicId = '';

  @Input()
  cards: Card[] = [];

  constructor(private cardService: CardService, private topicService: TopicService) {}

  ngOnInit(): void {
    if (this.topicId) {
      this.subscriptions.add(
        combineLatest(this.topicService.getTopics(), this.cardService.getCardsByTopicId(this.topicId)).subscribe(
          ([topics, cards]) => {
            this.topics = topics;
            this.setCards(cards);
            this.loading = false;
          }
        )
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public setCards(cards: Card[]) {
    this.cards = cards.sort((a, b) => b.lastStudy - a.lastStudy);
    this.filteredCards.next(this.cards);
  }

  public changeSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filter();
  }

  public changeIsReadyStudy() {
    this.isReadyStudyOnly = !this.isReadyStudyOnly;
    this.filter();
  }

  private filter() {
    if (!!this.topicId) {
      this.cardService
        .getAllCards()
        .pipe(first())
        .subscribe(cards => {
          this.allFilter(cards);
        });
    } else {
      this.allFilter(this.cards);
    }
  }

  private allFilter(cards: Card[]) {
    let filteredCards = cards.sort((a, b) => b.lastStudy - a.lastStudy);
    if (this.isReadyStudyOnly) {
      filteredCards = filteredCards.filter(card => card.isReadyToStudy);
    }

    if (this.searchTerm) {
      filteredCards = filteredCards.filter(
        card =>
          card.front.toLowerCase().search(this.searchTerm.toLowerCase()) >= 0 ||
          card.back.toLowerCase().search(this.searchTerm.toLowerCase()) >= 0
      );
    }
    this.filteredCards.next(filteredCards);
  }

  toggleCardInfo(cardId) {
    alert(cardId);
  }
}
