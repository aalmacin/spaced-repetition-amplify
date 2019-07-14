import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'al-flash-card',
  styleUrls: ['./flash-card.component.scss'],
  template: `
    <div
      class="al-flash-card al-tta-c al-lf al-lf-fd-c al-lf-jc-c al-lf-fw"
    >
      <al-card
        heading="{{ topic }}"
        class="al-flash-card-container al-sb-n-b"
      >
        <div *ngIf="!(flipped$ | async); else flashCardBack">
          {{ front }}
        </div>

        <ng-template #flashCardBack>
          <p class="al-tf-sm al-tfw-b">{{ front }}</p>
          <p class="back">
            {{ back }}
          </p>
        </ng-template>
      </al-card>

      <div class="al-flash-card-difficulty-group" *ngIf="flipped$ | async">
        <button
          alBtn
          class="al-flash-card-difficulty al-flash-card-easy al-lw-50"
          type="secondary"
          (click)="easyClicked()"
        >
          Easy
        </button>
        <button
          alBtn
          class="al-flash-card-difficulty al-flash-card-hard al-lw-50"
          type="secondary"
          (click)="hardClicked()"
        >
          Hard
        </button>
      </div>

      <button
        *ngIf="!(flipped$ | async)"
        alBtn
        class="al-flash-card-show-answer al-lw-100"
        type="secondary"
        size="lg"
        (click)="flip()"
      >
        Show Answer
      </button>
    </div>
  `
})
export class FlashCardComponent {
  @Input()
  public topic = '';

  @Input()
  public front = '';

  @Input()
  public back = '';

  @Output()
  public done = new BehaviorSubject<boolean>(false);

  @Output()
  public flipped = new BehaviorSubject<boolean>(false);

  @Output()
  public easy = new EventEmitter();

  @Output()
  public hard = new EventEmitter();

  public flipped$: Observable<boolean>;
  public done$: Observable<boolean>;

  constructor() {
    this.flipped$ = this.flipped.asObservable();
    this.done$ = this.done.asObservable();
  }

  public flip() {
    this.flipped.next(true);
  }

  public easyClicked() {
    this.easy.emit();
    this.finish();
  }

  public hardClicked() {
    this.hard.emit();
    this.finish();
  }

  public finish() {
    this.done.next(true);
  }
}
