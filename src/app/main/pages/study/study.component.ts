import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { shuffle } from 'lodash';

enum CardResult {
  EASY = 'easy',
  HARD = 'hard',
  PENDING = 'pending'
}

interface CardVM extends Card {
  result: CardResult;
}

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnDestroy {
  cards: CardVM[] = [];
  subscriptions = new Subscription();
  loading = true;
  errors: string[] = [];
  scheduledStudy = false;
  currentCardIndex = 0;
  cardFrontIndex = 0;
  cardBackIndex = 0;
  isShow = false;

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute) {
    this.subscriptions.add(
      this.activatedRoute.queryParams
        .pipe(
          map(q => q.topicId),
          tap(topicId => {
            this.scheduledStudy = !!!topicId;
          }),
          switchMap(topicId =>
            topicId ? this.cardService.getCardsByTopicId(topicId) : this.cardService.getAllStudyCards()
          )
        )
        .subscribe(cards => {
          this.loading = false;
          this.cards = shuffle(cards).map(card => ({ ...card, result: CardResult.PENDING }));
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public easierCard(card: Card, i: number) {
    if (this.scheduledStudy) {
      this.subscriptions.add(
        this.cardService.updateCardToEasy(card).subscribe((result: any) => {
          if (result.error) {
            this.errors = [result.error];
          }
        })
      );
    } else {
      this.updateCardResults(i, CardResult.EASY);
      if (i === 0) {
        this.updateHarderCards();
      }
    }
  }

  public harderCard(card: Card, i: number) {
    if (this.scheduledStudy) {
      this.subscriptions.add(
        this.cardService.updateCardToHard(card).subscribe((result: any) => {
          if (result.error) {
            this.errors = [result.error];
          }
        })
      );
      this.cardService.updateCardToHard(card);
    } else {
      this.updateCardResults(i, CardResult.HARD);
      if (i === 0) {
        this.updateHarderCards();
      }
    }
  }

  public showAnswer() {
    console.log('show answer');
    this.isShow = true;
    if (this.currentCardIndex !== 0) {
      this.cardBackIndex = this.cardBackIndex + 1;
    }
  }

  get indexInRange() {
    return this.currentCardIndex + 1 < this.cards.length;
  }

  get frontToShow() {
    return this.cards[this.cardFrontIndex];
  }

  get backToShow() {
    return this.cards[this.cardBackIndex];
  }

  public showNext() {
    this.isShow = false;
    this.cardFrontIndex = this.cardFrontIndex + 1;
    if (this.indexInRange) {
      this.currentCardIndex++;
    }
  }

  private updateCardResults(i, cardResult: CardResult) {
    this.cards[i].result = cardResult;
  }

  private updateHarderCards() {
    const harderCards = this.cards.filter(c => c.result === CardResult.HARD);
    this.cards = shuffle(harderCards).map(a => ({ ...a, result: CardResult.PENDING }));
  }

  get currentCard() {
    return this.cards[this.currentCardIndex];
  }
}
