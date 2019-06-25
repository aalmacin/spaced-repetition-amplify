import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { CardViewModel } from '../card';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent implements OnInit {
  public cards: any[] = [];

  constructor(private cardService: CardService) {
    this.cardService.getAllCards().subscribe(cards => {
      this.cards = cards;
      console.log(this.cards);
    });
  }

  ngOnInit() {}
}
