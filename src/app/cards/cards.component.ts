import { Component, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardViewModel } from '../card';
import { APIService, Box } from '../API.service';
import { makeBoxEasier } from '../study/study.func';
import { getCurrentTimestamp } from '../study/timestamp.func';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnDestroy {
  topicId: string;
  subscription = new Subscription();
  cardsSubscription: Subscription;

  cards: CardViewModel[] = [];
  isReadyToStudyOnly$: Observable<boolean>;
  public isReadyToStudyOnly: BehaviorSubject<boolean>;

  loading = true;

  hiddenCards = [];

  constructor(private apiService: APIService, public cardService: CardService, public route: ActivatedRoute) {
    this.isReadyToStudyOnly = new BehaviorSubject(true);
    this.isReadyToStudyOnly$ = this.isReadyToStudyOnly.asObservable();

    this.startCardsSubscription();

    const updateCardListener = this.apiService.OnUpdateCardListener.subscribe(topics => {
      this.cardsSubscription.unsubscribe();
      this.startCardsSubscription();
    });
    this.subscription.add(updateCardListener);

    this.subscription.add(
      this.route.params.subscribe(params => {
        this.topicId = params.topicid;
      })
    );
  }

  private startCardsSubscription() {
    this.cardsSubscription = combineLatest(this.isReadyToStudyOnly$, this.route.params)
      .pipe(switchMap(([isReadyToStudyOnly, params]) => this.cardService.getCards(params.topicid, isReadyToStudyOnly)))
      .subscribe((cards: CardViewModel[]) => {
        this.cards = cards;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cardsSubscription.unsubscribe();
  }

  updateIsReadyStudyOnly() {
    this.isReadyToStudyOnly.next(!this.isReadyToStudyOnly.getValue());
  }

  updateCardToEasy(id, box) {
    const easierBox = makeBoxEasier(box);
    this.apiService.UpdateCard({
      id,
      box: easierBox,
      lastStudy: getCurrentTimestamp()
    });
  }

  updateCardToHard(id, box) {
    this.apiService.UpdateCard({
      id,
      box: box.VERY_HARD,
      lastStudy: getCurrentTimestamp()
    });
  }
}
