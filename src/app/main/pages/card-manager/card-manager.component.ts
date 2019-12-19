import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '@spaced-repetition/types/card';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Validators, FormBuilder } from '@angular/forms';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss']
})
export class CardManagerComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  filteredCards: BehaviorSubject<Card[]> = new BehaviorSubject([]);
  subscriptions: Subscription = new Subscription();
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
  topicId = '';

  constructor(
    private cardService: CardService,
    private topicService: TopicService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    const cards$ = this.activatedRoute.queryParams.pipe(
      map(q => q.topicId),
      switchMap(topicId => {
        if (topicId) {
          return this.cardService.getCardsByTopicId(topicId);
        } else {
          return this.cardService.getAllCards();
        }
      })
    );
    const topics$ = this.topicService.getTopics();

    this.subscriptions.add(
      combineLatest(topics$, cards$).subscribe(([topics, cards]) => {
        this.topics = topics;
        this.setCards(cards);
        this.loading = false;
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public addNewCard() {
    if (this.addCardForm.status === 'VALID') {
      this.loading = true;
      this.subscriptions.add(
        this.cardService.addNewCard(this.addCardForm.value).subscribe((result: any) => {
          this.loading = false;
          this.addCardForm.get('front').setValue('');
          this.addCardForm.get('back').setValue('');
          if (result.error) {
            this.errors = [result.error];
          } else {
            this.messages = ['Successfully added card'];
            this.setCards(result);
          }
        })
      );
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
  }

  public deleteCard(event: MouseEvent, cardId: string) {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete?`)) {
      this.loading = true;
      this.subscriptions.add(
        this.cardService.deleteCard(cardId).subscribe((result: any) => {
          this.loading = false;
          if (result.error) {
            this.errors = [result.error];
          } else {
            this.messages = ['Successfully deleted card'];
            this.setCards(result);
          }
        })
      );
    }
  }

  public setCards(cards: Card[]) {
    this.cards = cards;
    this.filteredCards.next(this.cards);
    this.filter();
  }

  public changeSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filter();
  }

  public changeIsReadyStudy() {
    this.isReadyStudyOnly = !this.isReadyStudyOnly;
    this.filter();
  }

  public updateCard(id: string, front: string, back: string) {
    this.loading = true;
    this.subscriptions.add(
      this.cardService.updateCard({ id, front, back }).subscribe((res: any) => {
        this.loading = false;
        if (res.error) {
          this.errors = [res.error];
        } else {
          this.setCards(res);
        }
      })
    );
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
