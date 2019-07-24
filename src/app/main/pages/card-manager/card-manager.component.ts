import { Component, OnDestroy } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription, combineLatest } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Validators, FormBuilder } from '@angular/forms';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnDestroy {
  cards: Card[] = [];
  cardSubscription: Subscription;
  createCardSubscription: Subscription;
  loading = true;

  public addCardForm = this.fb.group({
    front: ['', Validators.required],
    back: ['', Validators.required],
    topicId: ['', Validators.required]
  });
  errors: string[] = [];
  messages: string[] = [];
  topics: Topic[] = [];

  constructor(private cardService: CardService, private topicService: TopicService, private fb: FormBuilder) {
    this.cardSubscription = combineLatest(this.cardService.getAllCards(), this.topicService.getTopics()).subscribe(
      ([cards, topics]) => {
        this.loading = false;
        this.topics = topics;
        this.cards = cards;
      }
    );
  }

  ngOnDestroy() {
    if (this.createCardSubscription) {
      this.createCardSubscription.unsubscribe();
    }
    this.cardSubscription.unsubscribe();
  }

  public addNewCard() {
    if (this.addCardForm.status === 'VALID') {
      this.loading = true;
      this.createCardSubscription = this.cardService.addNewCard(this.addCardForm.value).subscribe((result: any) => {
        this.loading = false;
        this.addCardForm.reset();
        if (result.error) {
          this.errors = [result.error];
        } else {
          this.cards = result;
        }
      });
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
  }
}
