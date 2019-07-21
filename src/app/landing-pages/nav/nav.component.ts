import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {
  public loggedIn = false;
  loggedInSubscription: Subscription;

  constructor(public authService: AuthService) {
    this.loggedInSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.loggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
