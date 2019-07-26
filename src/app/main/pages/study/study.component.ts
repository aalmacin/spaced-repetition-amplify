import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { shuffle } from 'lodash';

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

  constructor(private cardService: CardService, private activatedRoute: ActivatedRoute) {
    this.subscriptions.add(
      this.activatedRoute.queryParams
        .pipe(
          map(q => q.topicId),
          switchMap(topicId => {
            if (topicId) {
              return this.cardService.getCardsByTopicId(topicId);
            } else {
              return this.cardService.getAllStudyCards();
            }
          })
        )
        .subscribe(cards => {
          this.loading = false;
          this.cards = shuffle(cards);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public easierCard(card: Card) {
    this.subscriptions.add(
      this.cardService.updateCardToEasy(card).subscribe((result: any) => {
        if (result.error) {
          this.errors = [result.error];
        }
      })
    );
  }

  public harderCard(card: Card) {
    this.subscriptions.add(
      this.cardService.updateCardToEasy(card).subscribe((result: any) => {
        if (result.error) {
          this.errors = [result.error];
        }
      })
    );
    this.cardService.updateCardToHard(card);
  }
}
