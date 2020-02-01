import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser, selectSignUpErrors } from '@spaced-repetition/reducers';
import { SignUp } from '@spaced-repetition/user.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public errors: string[] = [];
  subscriptions = new Subscription();

  @Input()
  private navigateTo: string[] = ['/auth', 'confirm'];
  constructor(private store: Store<AppState>, private router: Router) {}

  public register(e: MouseEvent, email: string, password: string, confirmPassword: string) {
    e.preventDefault();
    if (password !== confirmPassword) {
      this.errors = ['Password did not match with confirmation'];
      return;
    }
    this.store.dispatch(new SignUp({ email, password }));
  }

  ngOnInit() {
    this.subscriptions
      .add(
        this.store.pipe(select(selectUser)).subscribe(user => {
          if (!!user) {
            this.router.navigate(this.navigateTo);
          }
        })
      )
      .add(
        this.store.pipe(select(selectSignUpErrors)).subscribe(errors => {
          this.errors = errors;
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
