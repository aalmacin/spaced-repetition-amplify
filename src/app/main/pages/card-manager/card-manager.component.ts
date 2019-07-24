import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Validators, FormBuilder } from '@angular/forms';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  filteredCards: BehaviorSubject<Card[]> = new BehaviorSubject([]);
  cardSubscription: Subscription;
  createCardSubscription: Subscription;
  loading = true;

  isReadyStudyOnly = false;

  public addCardForm = this.fb.group({
    front: ['', Validators.required],
    back: ['', Validators.required],
    topicId: ['', Validators.required]
  });
  errors: string[] = [];
  messages: string[] = [];
  topics: Topic[] = [];
  searchTerm = '';

  constructor(private cardService: CardService, private topicService: TopicService, private fb: FormBuilder) {
    this.cardSubscription = combineLatest(this.cardService.getAllCards(), this.topicService.getTopics()).subscribe(
      ([cards, topics]) => {
        this.loading = false;
        this.topics = topics;
        this.cards = cards;
        this.filteredCards.next(this.cards);
      }
    );
  }

  ngOnInit(): void {}

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

  public changeSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filter();
  }

  public changeIsReadyStudy() {
    this.isReadyStudyOnly = !this.isReadyStudyOnly;
    this.filter();
  }

  private filter() {
    let filteredCards = this.cards;
    if (this.isReadyStudyOnly) {
      filteredCards = filteredCards.filter(card => card.isReadyToStudy);
    }

    if (this.searchTerm) {
      filteredCards = filteredCards.filter(
        card =>
          card.front.toLowerCase().search(this.searchTerm.toLowerCase()) >= 0 ||
          card.back.toLowerCase().search(this.searchTerm.toLowerCase()) >= 0
      );
    }
    this.filteredCards.next(filteredCards);
  }
}
