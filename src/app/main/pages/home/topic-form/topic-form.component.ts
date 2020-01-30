import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Topic } from '@spaced-repetition/types/topic';
import { Subscription } from 'rxjs';
import { AppState } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { UpdateTopic } from '@spaced-repetition/topic.actions';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit, OnDestroy {
  @Input()
  topic: Topic = null;

  subscriptions = new Subscription();

  editMode = false;

  topicName = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (this.topic) {
      this.topicName = this.topic.name;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  enableEditMode() {
    this.editMode = true;
  }

  updateTopic(e: any) {
    if (e.target && e.target.value) {
      this.store.dispatch(new UpdateTopic({ id: this.topic.id, name: e.target.value }));
    }
  }

  disableEditMode() {
    this.editMode = false;
  }
}
