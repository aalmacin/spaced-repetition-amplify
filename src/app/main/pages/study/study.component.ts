import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { shuffle } from 'lodash';

export enum CardResult {
  EASY = 'easy',
  HARD = 'hard',
  PENDING = 'pending'
}

export interface CardVM extends Card {
  result: CardResult;
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
}
