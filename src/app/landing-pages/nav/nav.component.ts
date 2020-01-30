import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';

@Component({
  selector: 'app-landing-page-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {
  public loggedIn = false;
  loggedInSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.loggedInSubscription = this.store.pipe(select(selectUser)).subscribe(user => {
      this.loggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
