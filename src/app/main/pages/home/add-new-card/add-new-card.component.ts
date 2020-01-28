import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Subscription } from 'rxjs';
import { AppState } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { AddCard } from '@spaced-repetition/card.actions';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})
export class AddNewCardComponent implements OnInit {
  errors = [];
  messages = [];
  subscriptions = new Subscription();

  public addCardForm = this.fb.group({
    front: ['', Validators.required],
    back: ['', Validators.required],
    topicId: ['', Validators.required],
    reverseCard: [false]
  });

  @Output()
  closeModal = new EventEmitter();

  constructor(private store: Store<AppState>, private cardService: CardService, private fb: FormBuilder) {}

  ngOnInit() {
    this.addCardForm.reset({ topicId: '', front: '', back: '' });
  }

  public addNewCard() {
    if (this.addCardForm.status === 'VALID') {
      const cardValues = { ...this.addCardForm.value };
      this.store.dispatch(new AddCard(cardValues));
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
  }

  changeTopic(topicId) {
    const control = this.addCardForm.get('topicId');
    control.setValue(topicId);
  }

  closeCard() {
    this.closeModal.emit(true);
  }
}
