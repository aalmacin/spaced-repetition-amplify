import { Component, OnInit } from '@angular/core';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from '@spaced-repetition/amplify/card';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) {
    this.cardService.getAllStudyCards().subscribe(cards => (this.cards = cards));
  }

  ngOnInit() {
    console.log(this.cards);
  }
}
