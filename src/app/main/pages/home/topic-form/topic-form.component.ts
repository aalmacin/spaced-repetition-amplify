import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Topic } from '@spaced-repetition/types/topic';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Subscription } from 'rxjs';
import { isTopic } from '../topic.func';

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

  constructor(private topicService: TopicService) {}

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
      this.subscriptions.add(
        this.topicService.updateTopic(this.topic.id, e.target.value).subscribe(t => {
          if (isTopic(t)) {
            this.topicName = t.name;
          }
        })
      );
    }
  }

  disableEditMode() {
    this.editMode = false;
  }
}
