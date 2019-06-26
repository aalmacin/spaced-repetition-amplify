import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardViewModel } from '../card';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { APIService, Box } from '../API.service';
import { makeBoxEasier } from '../study/study.func';
import { getCurrentTimestamp } from '../study/timestamp.func';

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
          display: 'none',
          opacity: 0
        })
      ),
      state(
        'open',
        style({
          maxHeight: '100%',
          display: 'inherit',
          opacity: 1
        })
      ),
      transition('open => close', [animate('500ms ease')]),
      transition('close => open', [animate('500ms ease')])
    ])
  ]
})
export class CardsComponent implements OnDestroy {
  @ViewChild('front')
  private frontInput: ElementRef;
  @ViewChild('back')
  private backInput: ElementRef;

  topicId: string;
  subscription = new Subscription();
  cardsSubscription: Subscription;

  cards: CardViewModel[] = [];
  isReadyToStudyOnly$: Observable<boolean>;
  public isReadyToStudyOnly: BehaviorSubject<boolean>;

  isShowForm = false;
  loading = true;

  hiddenCards = [];

  constructor(private apiService: APIService, public cardService: CardService, public route: ActivatedRoute) {
    this.isReadyToStudyOnly = new BehaviorSubject(true);
    this.isReadyToStudyOnly$ = this.isReadyToStudyOnly.asObservable();

    this.startCardsSubscription();

    const createCardListener = this.apiService.OnCreateCardListener.subscribe(topics => {
      this.isShowForm = false;
      this.frontInput.nativeElement.value = '';
      this.backInput.nativeElement.value = '';
      this.loading = true;
      this.cardsSubscription.unsubscribe();
      this.startCardsSubscription();
    });
    this.subscription.add(createCardListener);

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

  addNewCard(front, back) {
    this.apiService.CreateCard({
      front,
      back,
      box: Box.VERY_HARD,
      cardTopicId: this.topicId,
      lastStudy: getCurrentTimestamp()
    });
    return false;
  }

  toggleAddCard() {
    this.isShowForm = !this.isShowForm;
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
