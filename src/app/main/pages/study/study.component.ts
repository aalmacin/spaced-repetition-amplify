import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from 'src/app/types/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  cardSubscription: Subscription;

  constructor(private cardService: CardService) {
    this.cardSubscription = this.cardService.getAllStudyCards().subscribe(cards => (this.cards = cards));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
  }
}
