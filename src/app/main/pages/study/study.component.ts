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

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnDestroy {
  cards: Card[] = [];
  subscriptions = new Subscription();
  loading = true;
  errors: string[] = [];
  scheduledStudy = false;
  cardResults: CardResult[] = [];

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
          this.cards = shuffle(cards);
          this.cardResults = this.cards.map(() => CardResult.PENDING);
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

  private updateCardResults(i, cardResult: CardResult) {
    this.cardResults[i] = cardResult;
  }

  private updateHarderCards() {
    const harderCards = this.cardResults
      .map((r, i) => ({ r, i }))
      .filter(c => c.r === CardResult.HARD)
      .map(c => this.cards[c.i]);
    this.cards = shuffle(harderCards).map(a => ({ ...a }));
    this.cardResults = this.cards.map(() => CardResult.PENDING);
  }
}
