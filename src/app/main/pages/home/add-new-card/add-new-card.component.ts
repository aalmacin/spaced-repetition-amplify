import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Subscription } from 'rxjs';

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
  loading = false;

  constructor(private cardService: CardService, private fb: FormBuilder) {}

  ngOnInit() {
    this.addCardForm.reset({ topicId: '', front: '', back: '' });
  }

  public addNewCard() {
    if (this.addCardForm.status === 'VALID') {
      this.loading = true;
      const cardValues = { ...this.addCardForm.value };
      this.subscriptions.add(
        this.cardService.addNewCard(cardValues, cardValues.topicId).subscribe((result: any) => {
          this.loading = false;
          this.addCardForm.get('front').setValue('');
          this.addCardForm.get('back').setValue('');
          this.addCardForm.get('reverseCard').setValue(false);
          if (result.error) {
            this.errors = [result.error];
          } else {
            this.messages = ['Successfully added card'];
          }
        })
      );
      if (cardValues.reverseCard) {
        const reverseCardValues = { ...cardValues, back: cardValues.front, front: cardValues.back };
        this.subscriptions.add(
          this.cardService.addNewCard(reverseCardValues, reverseCardValues.topicId).subscribe((result: any) => {
            this.loading = false;
            if (result.error) {
              this.errors = [result.error];
            } else {
              this.messages = ['Successfully added card'];
            }
          })
        );
      }
    } else {
      this.errors = ['Something went wrong while adding a new card.'];
    }
  }

  changeTopic(topicId) {
    const control = this.addCardForm.get('topicId');
    control.setValue(topicId);
  }
}
