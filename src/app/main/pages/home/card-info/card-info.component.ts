import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { Card } from '@spaced-repetition/types/card';
import { Topic } from '@spaced-repetition/types/topic';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy {
  @Input()
  card = null;

  @Input()
  topicId = '';

  subscriptions = new Subscription();

  loading = false;

  errors = [];
  messages = [];
  editFrontMode = false;
  editBackMode = false;
  topics: Topic[] = [];

  constructor(private cardService: CardService, public topicService: TopicService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.topicService.getTopics().subscribe(topics => {
        this.topics = topics;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateCard({ topicId, front, back }: Partial<Card>) {
    this.loading = true;
    this.subscriptions.add(
      this.cardService.updateCard({ id: this.card.id, topicId, front, back }, this.topicId).subscribe((res: any) => {
        this.loading = false;
        if (res.error) {
          this.errors = [res.error];
        }
      })
    );
  }

  public deleteCard(event: MouseEvent) {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete?`)) {
      this.loading = true;
      this.subscriptions.add(
        this.cardService.deleteCard(this.card.id, this.topicId).subscribe((result: any) => {
          this.loading = false;
          if (result.error) {
            this.errors = [result.error];
          } else {
            this.messages = ['Successfully deleted card'];
          }
        })
      );
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
    this.updateCard({ front: e.target.value, back: this.card.back, topicId: this.card.topicId });
  }

  updateBack(e) {
    this.updateCard({ front: this.card.front, back: e.target.value, topicId: this.card.topicId });
  }

  updateTopic(e) {
    this.updateCard({ front: this.card.front, back: this.card.back, topicId: e.target.value });
  }
}
