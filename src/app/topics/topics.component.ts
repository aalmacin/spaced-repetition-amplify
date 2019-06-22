import { Component, ViewChild, ElementRef } from '@angular/core';
import { APIService } from '../API.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  animations: [
    trigger('slideForm', [
      state('close', style({
        maxHeight: '0',
        opacity: 0
      })),
      state('open', style({
        maxHeight: '100%',
        opacity: 1
      })),
      transition('open => close', [
        animate('1s')
      ]),
      transition('close => open', [
        animate('1s')
      ]),
    ])
  ]
})
export class TopicsComponent {
  displayedColumns = ['topicName', 'topicStudy'];

  @ViewChild('topicName')
  private topicName!:ElementRef;

  public topics = [];

  isShowForm = false;

  constructor(private apiService: APIService) {
    this.loadTopics();
    this.apiService.OnCreateTopicListener.subscribe(() => {
      this.loadTopics();
      this.isShowForm = false;
      this.topicName.nativeElement.value = '';
    });
  }

  async loadTopics() {
    const service = await this.apiService.ListTopics();
    this.topics = service.items;
  }

  toggleAddTopic() {
    this.isShowForm = !this.isShowForm;
  }

  addNewTopic(topic: any) {
    this.apiService.CreateTopic({
      name: topic
    });
    return false;
  }
}
