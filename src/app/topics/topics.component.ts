import { Component, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../API.service';
import { AmplifyService } from 'aws-amplify-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../user';
import Amplify, { Auth } from 'aws-amplify';
import amplify from '../../aws-exports';

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
export class TopicsComponent {
  displayedColumns = ['topicName', 'topicStudy'];
  user: User;
  signedIn: boolean;

  @ViewChild('topicName')
  private topicName!: ElementRef;

  public topics = [];

  isShowForm = false;

  constructor(private amplifyService: AmplifyService, private apiService: APIService) {
    this.loadCurrentUser();
    this.loadTopics();
    this.apiService.OnCreateTopicListener.subscribe(() => {
      this.loadTopics();
      this.isShowForm = false;
      this.topicName.nativeElement.value = '';
    });
  }

  async loadCurrentUser() {
    const user = await Auth.currentAuthenticatedUser();
    this.user = { email: user.attributes.email };
  }

  async loadTopics() {
    await this.loadCurrentUser();
    const service = await this.apiService.ListTopics({ user: { eq: this.user.email } });
    this.topics = service.items;
  }

  toggleAddTopic() {
    this.isShowForm = !this.isShowForm;
  }

  addNewTopic(topic: any) {
    this.apiService.CreateTopic({
      user: this.user.email,
      name: topic
    });
    return false;
  }
}
