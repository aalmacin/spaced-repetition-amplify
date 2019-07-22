import { Component, OnDestroy } from '@angular/core';
import { CardService } from '../../amplify/card.service';
import { Subscription } from 'rxjs';
import { shuffle } from 'lodash';
import { CardViewModel } from '@spaced-repetition/amplify/card';
import { APIService } from 'src/app/API.service';
import { makeBoxEasier } from '../functions/study.func';
import { getCurrentTimestamp } from '../functions/timestamp.func';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html'
})
export class StudyComponent implements OnDestroy {
  subscription = new Subscription();
  cardsSubscription: Subscription;

  cards: CardViewModel[] = [];

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
