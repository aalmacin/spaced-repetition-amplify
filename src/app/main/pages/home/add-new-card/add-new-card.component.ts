import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { AddCard } from '@spaced-repetition/card.actions';
import { Card } from '@spaced-repetition/types/card';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})
export class AddNewCardComponent {
  errors = [];
  messages = [];
  subscriptions = new Subscription();

  addMultipleCardsMode = false;

  mainForm = this.fb.group({
    topicId: [null, Validators.required],
    cards: this.fb.array([this.createAddCardForm()])
  });

  csvForm = this.fb.group({
    csvData: ['', Validators.required],
    topicId: [null, Validators.required]
  });

  @Output()
  closeModal = new EventEmitter();

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  public addNewCard() {
    if (this.mainForm.status === 'VALID') {
      const mainFormValue = this.mainForm.value;
      mainFormValue.cards.forEach(addCardForm => {
        const cardValues = { ...addCardForm, topicId: mainFormValue.topicId };
        this.store.dispatch(new AddCard(cardValues));
      });
      this.reset();
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
  }

  changeTopic(topicId) {
    const control = this.mainForm.get('topicId');
    control.setValue(topicId);

    const csvControl = this.csvForm.get('topicId');
    csvControl.setValue(topicId);
  }

  closeCard() {
    this.mainForm.reset();
    this.closeModal.emit(true);
  }

  moreCard(e) {
    const control = this.mainForm.get('cards') as FormArray;
    control.push(this.createAddCardForm());
    e.preventDefault();
  }

  saveCsvCards(event: any) {
    if (this.csvForm.status === 'VALID') {
      const csvFormValue = this.csvForm.value;
      const rows = csvFormValue.csvData.split('\n');

      try {
        const cards = [];
        let error = false;
        this.errors = [];

        rows.forEach((row, t) => {
          const i = t + 1;
          if (!row) {
            this.errors.push(`Invalid row (${i}): ${row}`);
          } else {
            const cardData = { front: null, back: null, reverseCard: true };
            const columns = row.split(',');

            // const [front, back, reverse] = columns;
            const front = columns[0] && columns[0].trim();
            const back = columns[1] && columns[1].trim();
            const reverse = columns[2] && columns[2].trim();

            if (front) {
              cardData.front = front;
            } else {
              this.errors.push(`Invalid row (${i}): ${row}. Invalid front`);
            }

            if (back) {
              cardData.back = back;
            } else {
              this.errors.push(`Invalid row (${i}): ${row}. Invalid back`);
            }

            if (reverse) {
              if (reverse === 'false') {
                cardData.reverseCard = false;
              }

              if (reverse === 'true') {
                cardData.reverseCard = true;
              }

              if (reverse !== 'false' && reverse !== 'true') {
                this.errors.push(`Invalid row (${i}): ${row}. Invalid reverse value`);
                error = true;
              }
            }

            if (columns[3]) {
              this.errors.push(`Invalid row (${i}): ${row}. Extra column added`);
              error = true;
            }

            if (!error) {
              cards.push(cardData);
            }
          }
        });
        if (!error) {
          cards.forEach(cardValue => {
            const cardValues = { ...cardValue, topicId: csvFormValue.topicId };
            this.store.dispatch(new AddCard(cardValues));
          });
          this.messages.push('Successfully added cards');
          this.reset();
        }
      } catch (e) {
        this.errors = ['Something went wrong while adding a new card.'];
        console.error(e);
      }
      // this.reset();
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
    event.preventDefault();
  }

  toggleCsvForm() {
    this.addMultipleCardsMode = !this.addMultipleCardsMode;
  }

  get cardForms() {
    return (this.mainForm.get('cards') as FormArray).controls;
  }

  private createAddCardForm() {
    return this.fb.group({
      front: ['', Validators.required],
      back: ['', Validators.required],
      reverseCard: [true]
    });
  }

  private reset() {
    this.mainForm = this.fb.group({
      topicId: [null, Validators.required],
      cards: this.fb.array([this.createAddCardForm()])
    });

    this.csvForm = this.fb.group({
      csvData: ['', Validators.required],
      topicId: [null, Validators.required]
    });
  }
}
