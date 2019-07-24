import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnDestroy {
  cards: Card[] = [];
  cardSubscription: Subscription;
  loading = true;

  constructor(private cardService: CardService) {
    this.cardSubscription = this.cardService.getAllCards().subscribe(cards => {
      this.loading = false;
      this.cards = cards;
    });
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
  }
}
