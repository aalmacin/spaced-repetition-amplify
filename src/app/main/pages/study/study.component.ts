import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';

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

  constructor(private cardService: CardService) {
    this.subscriptions.add(
      this.cardService.getAllStudyCards().subscribe(cards => {
        this.loading = false;
        this.cards = cards;
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
