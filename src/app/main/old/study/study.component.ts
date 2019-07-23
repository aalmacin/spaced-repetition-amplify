import { Component, OnDestroy } from '@angular/core';
import { CardService } from '../../../amplify/card.service';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';
import { APIService } from 'src/app/API.service';
import { Card } from '@spaced-repetition/types/card';
import { makeBoxEasier } from '@spaced-repetition/main/shared/study.func';
import { getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html'
})
export class StudyComponent implements OnDestroy {
  subscription = new Subscription();
  cardsSubscription: Subscription;

  cards: Card[] = [];

  loading = true;

  constructor(private apiService: APIService, public cardService: CardService) {
    this.startCardsSubscription();

    const updateCardListener = this.apiService.OnUpdateCardListener.subscribe(topics => {
      this.cardsSubscription.unsubscribe();
      this.startCardsSubscription();
    });
    this.subscription.add(updateCardListener);
  }

  private startCardsSubscription() {
    this.cardsSubscription = this.cardService.getAllStudyCards().subscribe(cards => {
      this.cards = shuffle(cards);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cardsSubscription.unsubscribe();
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
