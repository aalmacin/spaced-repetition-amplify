import { Component, OnDestroy } from '@angular/core';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';
import { getNextStudyDate, makeBoxEasier } from '@spaced-repetition/main/shared/study.func';
import { getCurrentTimestamp, getDateFromTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Store, select } from '@ngrx/store';
import { AppState, selectReadyToStudyCards } from '@spaced-repetition/reducers';

export enum CardResult {
  EASY = 'easy',
  HARD = 'hard',
  PENDING = 'pending'
}

export interface CardVM extends Card {
  result: CardResult;
  potentialNextStudy: string;
}

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnDestroy {
  loading = true;
  cards: CardVM[] = [];
  subscriptions = new Subscription();
  scheduledStudy = false;

  constructor(private store: Store<AppState>) {
    this.subscriptions.add(
      this.store.pipe(select(selectReadyToStudyCards)).subscribe(cards => {
        this.cards = this.transformCardToVM(shuffle(cards));
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private transformCardToVM(cards): CardVM[] {
    return cards.map(card => ({
      ...card,
      result: CardResult.PENDING,
      potentialNextStudy: getDateFromTimestamp(getNextStudyDate(getCurrentTimestamp(), makeBoxEasier(card.box)))
    }));
  }
}
