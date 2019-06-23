import { Component, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardViewModel } from '../card';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { APIService, Box } from '../API.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [
    trigger('slideForm', [
      state(
        'close',
        style({
          maxHeight: '0',
          opacity: 0
        })
      ),
      state(
        'open',
        style({
          maxHeight: '100%',
          opacity: 1
        })
      ),
      transition('open => close', [animate('1s')]),
      transition('close => open', [animate('1s')])
    ])
  ]
})
export class CardsComponent implements OnDestroy {
  topicId: string;
  subscription = new Subscription();

  cards: CardViewModel[] = [];
  isReadyToStudyOnly$: Observable<boolean>;
  public isReadyToStudyOnly: BehaviorSubject<boolean>;

  isShowForm = false;

  constructor(private apiService: APIService, public cardService: CardService, public route: ActivatedRoute) {
    this.isReadyToStudyOnly = new BehaviorSubject(true);
    this.isReadyToStudyOnly$ = this.isReadyToStudyOnly.asObservable();
    this.subscription
      .add(
        combineLatest(this.isReadyToStudyOnly$, this.route.params)
          .pipe(
            switchMap(([isReadyToStudyOnly, params]) => this.cardService.getCards(params.topicid, isReadyToStudyOnly))
          )
          .subscribe((cards: CardViewModel[]) => {
            this.cards = cards;
          })
      )
      .add(
        this.route.params.subscribe(params => {
          this.topicId = params.topicid;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateIsReadyStudyOnly() {
    this.isReadyToStudyOnly.next(!this.isReadyToStudyOnly.getValue());
  }

  addNewCard(front, back) {
    this.apiService.CreateCard({
      front,
      back,
      box: Box.VERY_HARD,
      cardTopicId: this.topicId
    });
    return false;
  }

  toggleAddCard() {
    this.isShowForm = !this.isShowForm;
  }
}
