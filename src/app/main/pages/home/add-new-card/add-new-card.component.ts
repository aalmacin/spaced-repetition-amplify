import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { AddCard } from '@spaced-repetition/card.actions';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})
export class AddNewCardComponent {
  errors = [];
  messages = [];
  subscriptions = new Subscription();

  mainForm = this.fb.group({
    topicId: [null, Validators.required],
    cards: this.fb.array([this.createAddCardForm()])
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

  get cardForms() {
    return (this.mainForm.get('cards') as FormArray).controls;
  }

  private createAddCardForm() {
    return this.fb.group({
      front: ['', Validators.required],
      back: ['', Validators.required],
      reverseCard: ['checked']
    });
  }

  private reset() {
    this.mainForm = this.fb.group({
      topicId: [null, Validators.required],
      cards: this.fb.array([this.createAddCardForm()])
    });
  }
}
