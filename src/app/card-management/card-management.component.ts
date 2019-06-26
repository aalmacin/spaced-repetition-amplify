import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent implements OnInit {
  public cards: any[] = [];

  public loading = true;

  constructor(private cardService: CardService) {
    this.cardService.getAllCards().subscribe(cards => {
      this.cards = cards;
      this.loading = false;
    });
  }

  ngOnInit() {}
}
