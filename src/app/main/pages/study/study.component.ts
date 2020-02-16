import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Card } from 'src/app/types/card';
import { Subscription, BehaviorSubject } from 'rxjs';
import { shuffle } from 'lodash';
import { getNextStudyDate, makeBoxEasier } from '@spaced-repetition/main/shared/study.func';
import { getCurrentTimestamp, getDateFromTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Store, select } from '@ngrx/store';
import { AppState, selectReadyToStudyCards, selectStudyCards } from '@spaced-repetition/reducers';
import { ActivatedRoute } from '@angular/router';
import {
  LoadStudyCardsForTopic,
  LoadStudyCards,
  UpdateCardToEasy,
  UpdateCardToHard
} from '@spaced-repetition/card.actions';
import { map, switchMap } from 'rxjs/operators';

export enum CardResult {
  EASY = 'easy',
  HARD = 'hard',
  PENDING = 'pending'
}

type CardStatus = {
  showBack: boolean;
  saved: boolean;
};

export interface CardVM extends Card {
  status: CardStatus;
  result: CardResult;
  potentialNextStudy: string;
}

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  scheduledStudy = true;
  errors: string[] = [];

  @ViewChild('cardResults')
  cardResults: ElementRef;

  beforeUpdates: CardVM[] = [];
  resultCard: CardVM;

  @ViewChild('cardResultInfo')
  cardResultInfo: ElementRef;

  currentIndex$ = new BehaviorSubject<number>(0);
  currentCard$ = new BehaviorSubject<CardVM>(null);

  currentCardIndex = 0;
  currentCard: CardVM = null;

  topicId$ = new BehaviorSubject<string>(null);
  topicId: string = null;

  cards$ = new BehaviorSubject<CardVM[]>([]);
  cards: CardVM[] = [];

  hardCardsCount$ = new BehaviorSubject(0);
  hardCardsCount = 0;

  last = false;

  constructor(private store: Store<AppState>, private router: ActivatedRoute, private renderer: Renderer2) {}

  ngOnInit() {
    this.subscriptions
      .add(
        this.router.queryParams.subscribe(params => {
          if (params.topicId) {
            this.scheduledStudy = false;
          }
          this.topicId$.next(params.topicId || 'no-topic');
          this.store.dispatch(this.topicId ? new LoadStudyCardsForTopic(this.topicId) : new LoadStudyCards());
        })
      )
      .add(
        this.topicId$.asObservable().subscribe(topicId => {
          this.topicId = topicId;
        })
      )
      .add(
        this.topicId$
          .asObservable()
          .pipe(
            map(topicId => (topicId ? selectStudyCards : selectReadyToStudyCards)),
            switchMap(selector => this.store.pipe(select(selector)))
          )
          .subscribe(cards => {
            this.cards$.next(this.transformCardToVM(shuffle(cards)));
            this.currentIndex$.next(0);
          })
      )
      .add(
        this.cards$.asObservable().subscribe(cards => {
          this.cards = cards;

          this.hardCardsCount$.next(cards.filter(card => card.result === CardResult.HARD).length);
        })
      )
      .add(
        this.currentIndex$.asObservable().subscribe(currentIndex => {
          this.currentCardIndex = currentIndex;
          this.currentCard$.next(this.cards[currentIndex]);
          if (this.currentCardIndex === this.cards.length) {
            this.last = true;
          }
        })
      )
      .add(
        this.currentCard$.asObservable().subscribe(currentCard => {
          this.currentCard = currentCard;

          const updatedCards = [...this.cards];
          updatedCards[this.currentCardIndex] = { ...currentCard };
          this.cards$.next(updatedCards);
        })
      )
      .add(
        this.hardCardsCount$.asObservable().subscribe(hardCardsCount => {
          this.hardCardsCount = hardCardsCount;
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public showAnswer() {
    this.currentCard$.next({ ...this.currentCard, status: { ...this.currentCard.status, showBack: true } });
  }

  public easierCard() {
    if (this.scheduledStudy) {
      this.store.dispatch(new UpdateCardToEasy(this.currentCard));
    }

    const updatedCard = {
      ...this.currentCard,
      status: { ...this.currentCard.status, saved: true },
      result: CardResult.EASY
    };
    this.currentCard$.next(updatedCard);

    this.save();
  }

  public harderCard() {
    this.store.dispatch(new UpdateCardToHard(this.currentCard));

    const updatedCard = {
      ...this.currentCard,
      status: { ...this.currentCard.status, saved: true },
      result: CardResult.HARD
    };
    this.currentCard$.next(updatedCard);

    this.save();
  }

  save() {
    if (this.currentCardIndex + 1 < this.cards.length) {
      this.currentIndex$.next(this.currentCardIndex + 1);
    }

    if (this.cards.length) {
      const firstResult = this.cardResults.nativeElement.querySelector('.card-results__result--0');
      const scrollAmt = firstResult.clientWidth + 2;
      this.cardResults.nativeElement.scrollLeft = scrollAmt * this.currentCardIndex - scrollAmt * 3;
    }
  }

  public showInfo(e: MouseEvent, i) {
    this.resultCard = this.cards[i];
    this.renderer.setStyle(this.cardResultInfo.nativeElement, 'left', `${e.clientX}px`);
    this.renderer.setStyle(this.cardResultInfo.nativeElement, 'top', `${e.clientY}px`);
    this.renderer.addClass(this.cardResultInfo.nativeElement, 'show-card-result');
  }

  public clearCardResult() {
    this.renderer.removeClass(this.cardResultInfo.nativeElement, 'show-card-result');
  }

  public startHardCards() {
    if (!this.scheduledStudy && this.topicId) {
      this.store.dispatch(new LoadStudyCardsForTopic(this.topicId));
    } else {
      this.store.dispatch(new LoadStudyCards());
    }
  }

  public clickResult(i) {
    const card = this.cards[i];
    if (card.result !== CardResult.PENDING) {
      console.log(card);
    }
  }

  private transformCardToVM(cards): CardVM[] {
    return cards.map(card => ({
      ...card,
      status: {
        showBack: false,
        saved: false
      },
      result: CardResult.PENDING,
      potentialNextStudy: getDateFromTimestamp(getNextStudyDate(getCurrentTimestamp(), makeBoxEasier(card.box)))
    }));
  }
}
