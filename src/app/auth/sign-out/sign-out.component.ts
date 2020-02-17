import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { SignOut } from '@spaced-repetition/user.actions';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectUser)).subscribe(user => {
        if (!user) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public signOut(e: MouseEvent) {
    this.store.dispatch(new SignOut());

    e.preventDefault();
  }
}
