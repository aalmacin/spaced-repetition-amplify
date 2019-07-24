import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription, combineLatest } from 'rxjs';
import { User } from '@spaced-repetition/types/user';
import { TopicService } from '@spaced-repetition/amplify/topic.service';
import { CardService } from '@spaced-repetition/amplify/card.service';
import { Card } from '@spaced-repetition/types/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {
  private userSubscription: Subscription;
  public user!: User;
  public topics = [];
  public cards = [];
  public studyCards = [];
  public loading = false;

  constructor(private authService: AuthService, private topicService: TopicService, private cardService: CardService) {
    this.loading = true;
    this.userSubscription = combineLatest(
      this.authService.getCurrentUser(),
      this.topicService.getTopics(),
      this.cardService.getAllCards()
    ).subscribe(([user, topics, cards]) => {
      this.loading = false;
      this.user = user;
      this.topics = topics;
      this.cards = cards;
      this.studyCards = cards.filter((card: Card) => card.isReadyToStudy);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
