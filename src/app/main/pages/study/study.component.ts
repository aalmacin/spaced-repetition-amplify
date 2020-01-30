import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';
import { getNextStudyDate, makeBoxEasier } from '@spaced-repetition/main/shared/study.func';
import { getCurrentTimestamp, getDateFromTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Store, select } from '@ngrx/store';
import { AppState, selectReadyToStudyCards, selectStudyCards } from '@spaced-repetition/reducers';
import { ActivatedRoute } from '@angular/router';
import { LoadStudyCardsForTopic } from '@spaced-repetition/card.actions';

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
export class StudyComponent implements OnInit, OnDestroy {
  loading = true;
  cards: CardVM[] = [];
  subscriptions = new Subscription();
  scheduledStudy = true;
  topicId?: string = null;

  constructor(private store: Store<AppState>, private router: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.add(
      this.router.queryParams.subscribe(params => {
        if (params.topicId) {
          this.store.dispatch(new LoadStudyCardsForTopic(params.topicId));
          this.scheduledStudy = false;
          this.topicId = params.topicId;
        }

        const selector = this.topicId ? selectStudyCards : selectReadyToStudyCards;
        this.subscriptions.add(
          this.store.pipe(select(selector)).subscribe(cards => {
            this.cards = this.transformCardToVM(shuffle(cards));
          })
        );
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
