import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser, selectConfirmErrors, selectConfirmSuccess } from '@spaced-repetition/reducers';
import { ConfirmUser } from '@spaced-repetition/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  public success: string[] = [];
  public errors: string[] = [];
  subscriptions = new Subscription();

  @Input()
  private navigateTo: string[] = ['/app', 'home'];

  email = '';
  currentEmail?: string = null;
  code?: string = null;

  constructor(private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {}

  // confirm(event: MouseEvent, email: string, code: string) {
  //   event.preventDefault();
  // }

  ngOnInit() {
    this.subscriptions
      .add(
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.email) {
            this.currentEmail = params.email;
          }
          if (params.code) {
            this.code = params.code;
          }
          if (this.currentEmail && this.code) {
            this.store.dispatch(new ConfirmUser({ email: this.currentEmail, code: this.code }));
          }
        })
      )
      .add(
        this.store.pipe(select(selectUser)).subscribe(user => {
          if (user && user.confirmed) {
            this.router.navigate(this.navigateTo);
          }
        })
      )
      .add(
        this.store.pipe(select(selectConfirmErrors)).subscribe(errors => {
          this.errors = errors;
        })
      )
      .add(
        this.store.pipe(select(selectConfirmSuccess)).subscribe(success => {
          this.success = success;
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateEmail(email) {
    this.email = email;
  }
}
