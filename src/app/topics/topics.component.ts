import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { APIService } from '../API.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../user';
import { TopicService } from '../topic.service';
import { Subscription } from 'rxjs';

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
          opacity: 0
        })
      ),
      state(
        'open',
        style({
          maxHeight: '100%',
          opacity: 1
        })
      ),
      transition('open => close', [animate('1s')]),
      transition('close => open', [animate('1s')])
    ])
  ]
})
export class TopicsComponent implements OnDestroy {
  displayedColumns = ['topicName', 'topicStudy'];
  user: User;
  signedIn: boolean;

  @ViewChild('topicName')
  private topicName!: ElementRef;

  private topicsSubscription: Subscription;
  private subscription = new Subscription();

  public topics = [];

  isShowForm = false;

  constructor(private apiService: APIService, private topicService: TopicService) {
    this.startTopicsSubscription();
    const createTopicListener = this.apiService.OnCreateTopicListener.subscribe(topics => {
      this.isShowForm = false;
      this.topicName.nativeElement.value = '';
      this.topicsSubscription.unsubscribe();
      this.startTopicsSubscription();
    });
    this.subscription.add(createTopicListener);
  }

  private startTopicsSubscription(): void {
    this.topicsSubscription = this.topicService.getTopics().subscribe(topics => {
      this.topics = topics;
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
  }
}
