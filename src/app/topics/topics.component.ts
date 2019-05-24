import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  displayedColumns = ['topicName', 'topicStudy'];

  constructor(public topicService: TopicService) {}
}
