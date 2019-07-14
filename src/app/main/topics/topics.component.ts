import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { APIService } from '../../API.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TopicService } from '../../topic.service';
import { Subscription } from 'rxjs';
import { User } from '../main/user';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
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
export class TopicsComponent implements OnDestroy {
  displayedColumns = ['topicName', 'topicStudy'];
  user: User;
  signedIn: boolean;

  @ViewChild('topicName')
  private topicNameInput!: ElementRef;

  private topicsSubscription: Subscription;
  private subscription = new Subscription();

  public topics = [];

  isShowForm = false;
  public loading = true;

  constructor(private apiService: APIService, private topicService: TopicService) {
    this.startTopicsSubscription();
    const createTopicListener = this.apiService.OnCreateTopicListener.subscribe(() => {
      this.loading = true;
      this.isShowForm = false;
      this.topicNameInput.nativeElement.value = '';
      this.topicsSubscription.unsubscribe();
      this.startTopicsSubscription();
    });
    this.subscription.add(createTopicListener);
  }

  private startTopicsSubscription(): void {
    this.topicsSubscription = this.topicService.getTopics().subscribe(topics => {
      this.topics = topics;
      this.loading = false;
    });
  }

  toggleAddTopic() {
    this.isShowForm = !this.isShowForm;
  }

  addNewTopic(topic: string) {
    this.topicService.addTopic(topic);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.topicsSubscription.unsubscribe();
  }
}
