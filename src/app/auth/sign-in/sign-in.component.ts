import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Subscription } from 'rxjs';
import { SignIn } from '@spaced-repetition/user.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public loading = false;
  public errors: string[] = [];
  public subscriptions = new Subscription();

  @Input()
  private navigateTo: string[] = ['/app', 'home'];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.pipe(select(selectUser)).subscribe(user => {
        if (!!user) {
          this.router.navigate(this.navigateTo);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  signIn(event: any, email: string, password: string) {
    event.preventDefault();
    this.store.dispatch(
      new SignIn({
        email,
        password
      })
    );
  }
}
