import { Component, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { CardVM, CardResult } from '../study.component';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';
import { getDateFromTimestamp, getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { getNextStudyDate, makeBoxEasier } from '@spaced-repetition/main/shared/study.func';
import { Store } from '@ngrx/store';
import { AppState } from '@spaced-repetition/reducers';
import { UpdateCardToEasy, UpdateCardToHard, LoadStudyCards } from '@spaced-repetition/card.actions';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent {
  errors: string[] = [];
  currentCardIndex = 0;
  showBack = false;
  subscriptions = new Subscription();
  saved = false;
  last = false;
  continue = false;

  @ViewChild('cardResults')
  cardResults: ElementRef;

  @Input()
  scheduledStudy = false;

  @Input()
  cards: CardVM[] = [];
  resultCard: CardVM;

  @ViewChild('cardResultInfo')
  cardResultInfo: ElementRef;

  constructor(private store: Store<AppState>, private renderer: Renderer2) {}

  public easierCard() {
    this.store.dispatch(new UpdateCardToEasy(this.currentCard));
    this.cards[this.currentCardIndex] = {
      ...this.currentCard,
      result: CardResult.EASY
    };
    this.save();
  }

  public harderCard() {
    this.store.dispatch(new UpdateCardToHard(this.currentCard));
    this.cards[this.currentCardIndex] = {
      ...this.currentCard,
      result: CardResult.HARD
    };
    this.save();
  }

  public showAnswer() {
    this.showBack = true;
    this.saved = false;
    this.continue = false;
  }

  get indexInRange() {
    return this.currentCardIndex + 1 < this.cards.length;
  }

  save() {
    this.saved = true;
    if (this.indexInRange) {
      this.currentCardIndex++;
    }
  }

  public showNext() {
    this.showBack = false;
    this.setLast();
    if (this.cards.length) {
      if (this.currentCardIndex > 4) {
        const firstResult = this.cardResults.nativeElement.querySelector('.card-results__result--0');
        const scrollAmt = firstResult.clientWidth;
        this.cardResults.nativeElement.scrollLeft += scrollAmt;
      }
    }
  }

  public setLast() {
    if (this.currentCardIndex === this.cards.length - 1) {
      this.last = true;
    }
  }

  get currentCard() {
    return this.cards[this.currentCardIndex];
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

  get hardCards() {
    return this.cards.filter(card => card.result === CardResult.HARD);
  }

  public startHardCards() {
    this.store.dispatch(new LoadStudyCards());
    this.currentCardIndex = 0;
    this.showBack = false;
    this.saved = false;
    this.continue = true;
    this.last = false;
    this.setLast();
  }
}
