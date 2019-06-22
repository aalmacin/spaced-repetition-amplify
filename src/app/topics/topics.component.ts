import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';
import { APIService } from '../API.service';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  displayedColumns = ['topicName', 'topicStudy'];

  public topics = [];

  constructor(private apiService: APIService) {
    this.loadTopics();
  }

  async loadTopics() {
    const service = await this.apiService.ListTopics();
    this.topics = service.items;
  }
}
