import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService, Box } from 'src/app/API.service';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Component } from '@angular/core';
import { getCurrentTimestamp } from '../functions/timestamp.func';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  animations: [
    trigger('slideForm', [
      state(
        'close',
        style({
          maxHeight: '0',
          display: 'none',
          opacity: 0
        })
      ),
      state(
        'open',
        style({
          maxHeight: '100%',
          display: 'inherit',
          opacity: 1
        })
      ),
      transition('open => close', [animate('500ms ease')]),
      transition('close => open', [animate('500ms ease')])
    ])
  ]
})
export class AddCardComponent {
  public addCardForm = this.fb.group({
    front: ['', Validators.required],
    back: ['', Validators.required],
    topicId: ['', Validators.required]
  });

  subscription = new Subscription();

  public topics = [];

  public isShowForm = false;

  constructor(private apiService: APIService, private topicService: TopicService, private fb: FormBuilder) {
    const createCardListener = this.apiService.OnCreateCardListener.subscribe(() => {
      this.isShowForm = false;
      this.addCardForm.reset();
    });
    const topicsSubscription = this.topicService.getTopics().subscribe(topics => {
      this.topics = topics;
    });
    this.subscription.add(createCardListener).add(topicsSubscription);
  }

  toggleAddCard() {
    this.isShowForm = !this.isShowForm;
  }

  public addNewCard() {
    if (this.addCardForm.status === 'VALID') {
      const { front, back, topicId } = this.addCardForm.value;
      this.apiService.CreateCard({
        front,
        back,
        box: Box.VERY_HARD,
        cardTopicId: topicId,
        lastStudy: getCurrentTimestamp()
      });
    }
    return false;
  }
}
