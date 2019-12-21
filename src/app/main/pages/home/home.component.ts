import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@spaced-repetition/types/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  subscriptions = new Subscription();
  user: User;
  createTopicToggle = false;
  constructor(public authService: AuthService) {
    this.subscriptions.add(
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
