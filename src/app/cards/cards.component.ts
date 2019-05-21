import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardViewModel } from '../card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnDestroy {
  topicId: number;
  subscription = new Subscription();

  cards: CardViewModel[] = [];
  isReadyToStudyOnly = true;

  constructor(public cardService: CardService, public route: ActivatedRoute) {
    this.subscription
      .add(
        route.params.subscribe(param => {
          this.topicId = parseInt(param.topicid, 10);
        })
      )
      .add(
        cardService.getCards(this.topicId, this.isReadyToStudyOnly).subscribe(cards => {
          this.cards = cards;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateIsReadyStudyOnly() {
    this.isReadyToStudyOnly = !this.isReadyToStudyOnly;
  }
}
