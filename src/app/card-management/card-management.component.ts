import { Component, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { APIService } from '../API.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent implements OnDestroy {
  public cards: any[] = [];

  public loading = true;
  private getCardsSubscription: Subscription;
  private createCardSubscription: ZenObservable.Subscription;

  constructor(private apiService: APIService, private cardService: CardService) {
    this.getCardsSubscription = this.cardService.getAllCards().subscribe(cards => {
      this.cards = cards;
      this.loading = false;
    });
    this.createCardSubscription = this.apiService.OnCreateCardListener.subscribe(() => {
      this.loading = true;
      this.getCardsSubscription.unsubscribe();
      this.resetCardsSubscription();
    });
  }

  private resetCardsSubscription(): void {
    this.getCardsSubscription = this.cardService.getAllCards().subscribe(cards => {
      this.cards = cards;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.getCardsSubscription.unsubscribe();
    this.createCardSubscription.unsubscribe();
  }
}
