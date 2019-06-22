import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardViewModel } from '../card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnDestroy {
  topicId: number;
  subscription = new Subscription();

  cards: CardViewModel[] = [];
  isReadyToStudyOnly$: Observable<boolean>;
  public isReadyToStudyOnly: BehaviorSubject<boolean>;

  constructor(public cardService: CardService, public route: ActivatedRoute) {
    this.isReadyToStudyOnly = new BehaviorSubject(true);
    this.isReadyToStudyOnly$ = this.isReadyToStudyOnly.asObservable();
    this.subscription.add(
      combineLatest(this.isReadyToStudyOnly$, this.route.params)
        .pipe(
          switchMap(([isReadyToStudyOnly, params]) =>
            this.cardService.getCards(parseInt(params.topicid, 10), isReadyToStudyOnly)
          )
        )
        .subscribe(cards => {
          this.cards = cards;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateIsReadyStudyOnly() {
    this.isReadyToStudyOnly.next(!this.isReadyToStudyOnly.getValue());
  }
}
