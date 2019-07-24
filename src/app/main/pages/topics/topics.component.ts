import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Topic } from '@spaced-repetition/types/topic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnDestroy {
  @ViewChild('topicName')
  private topicName: ElementRef;

  public topics: Topic[] = [];
  public loading = false;
  private topicSubscription: Subscription;
  private createTopicSubscription: Subscription;
  public errors: string[] = [];
  public messages: string[] = [];

  constructor(private topicService: TopicService, private renderer: Renderer2) {
    this.loading = true;
    this.topicSubscription = this.topicService.getTopics().subscribe(topics => {
      this.loading = false;
      this.topics = topics;
    });
  }

  public ngOnDestroy() {
    this.topicSubscription.unsubscribe();
    if (this.createTopicSubscription) {
      this.createTopicSubscription.unsubscribe();
    }
  }

  public createTopic(event: MouseEvent, topicName: string) {
    event.preventDefault();
    this.loading = true;
    this.createTopicSubscription = this.topicService.addTopic(topicName).subscribe((result: any) => {
      this.loading = false;
      if (result.error) {
        this.errors = [result.error];
      } else {
        this.topics = result;
        this.messages = [`Successfully added ${topicName}`];
        this.renderer.setAttribute(this.topicName.nativeElement, 'value', '');
      }
    });
  }
}
