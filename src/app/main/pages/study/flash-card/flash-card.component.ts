import { Component, Input } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { CardVM, CardResult } from '../study.component';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent {
  errors: string[] = [];
  currentCardIndex = 0;
  isShow = false;
  subscriptions = new Subscription();
  saved = false;
  last = false;

  @Input()
  scheduledStudy = false;

  @Input()
  cards: CardVM[] = [];

  constructor(private cardService: CardService) {}

  public easierCard() {
    if (this.scheduledStudy) {
      this.subscriptions.add(
        this.cardService.updateCardToEasy(this.currentCard).subscribe((result: any) => {
          if (result.error) {
            this.errors = [result.error];
          }
        })
      );
    } else {
      this.cards[this.currentCardIndex] = {
        ...this.currentCard,
        result: CardResult.EASY
      };
    }
    this.save();
  }

  public harderCard() {
    if (this.scheduledStudy) {
      this.subscriptions.add(
        this.cardService.updateCardToHard(this.currentCard).subscribe((result: any) => {
          if (result.error) {
            this.errors = [result.error];
          }
        })
      );
    } else {
      this.cards[this.currentCardIndex] = {
        ...this.currentCard,
        result: CardResult.HARD
      };
    }
    this.save();
  }

  public showAnswer() {
    this.isShow = true;
    this.saved = false;
  }

  get indexInRange() {
    return this.currentCardIndex + 1 < this.cards.length;
  }

  public animationEnded() {
    alert('The end');
  }

  save() {
    this.saved = true;
    if (this.indexInRange) {
      this.currentCardIndex++;
    }
  }

  public showNext() {
    this.isShow = false;
    if (this.currentCardIndex === this.cards.length - 1) {
      this.last = true;
    }
  }

  get currentCard() {
    return this.cards[this.currentCardIndex];
  }
}
