import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardViewModel } from '../card';

@Component({
  selector: 'app-flash-card',
  template: `
    <div class="flash-card" *ngIf="card">
      <h2>{{ card.topicName }}</h2>
      <div>
        {{ card.front }}
      </div>
      <div>
        <span *ngIf="flipped$ | async">
          {{ card.back }}
        </span>
        <div *ngIf="!(flipped$ | async)">
          <button (click)="showAnswer()">Show Answer</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent {
  @Input()
  card: CardViewModel;

  private flipped: BehaviorSubject<boolean>;

  flipped$: Observable<boolean>;

  constructor() {
    this.flipped = new BehaviorSubject(false);
    this.flipped$ = this.flipped.asObservable();

    console.log('CONSTRUCT', this.card);
  }

  public getFlipped(): boolean {
    return this.flipped.getValue();
  }

  public setFlipped(nextState: boolean) {
    this.flipped.next(nextState);
  }

  showAnswer() {
    this.setFlipped(true);
    console.log('CLICKED');
  }
}
