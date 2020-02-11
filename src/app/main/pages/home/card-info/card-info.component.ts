import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '@spaced-repetition/types/card';
import { AppState } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { UpdateCard, DeleteCard } from '@spaced-repetition/card.actions';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  @Input()
  card = null;

  @Input()
  topicId = '';

  subscriptions = new Subscription();

  errors = [];
  messages = [];
  editFrontMode = false;
  editBackMode = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  private updateCard({ topicId, front, back }: Partial<Card>) {
    this.store.dispatch(new UpdateCard({ id: this.card.id, topicId, front, back }));
  }

  public deleteCard(event: MouseEvent) {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete?`)) {
      this.store.dispatch(new DeleteCard({ topicId: this.topicId, id: this.card.id }));
    }
  }

  setEditFrontMode(frontMode) {
    this.editFrontMode = frontMode;
    this.editBackMode = false;
  }

  setEditBackMode(backMode) {
    this.editBackMode = backMode;
    this.editFrontMode = false;
  }

  updateFront(e) {
    this.updateCard({ front: e.target.value, back: this.card.back, topicId: this.topicId });
  }

  updateBack(e) {
    this.updateCard({ front: this.card.front, back: e.target.value, topicId: this.topicId });
  }

  updateTopic(topicId) {
    this.updateCard({ front: this.card.front, back: this.card.back, topicId });
  }
}
