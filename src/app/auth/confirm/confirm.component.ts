import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { ConfirmUser } from '@spaced-repetition/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {
  public loading = false;
  public errors: string[] = [];
  subscriptions = new Subscription();

  @Input()
  private navigateTo: string[] = ['/app', 'home'];

  constructor(private store: Store<AppState>, private router: Router) {}

  confirm(event: MouseEvent, email: string, code: string) {
    event.preventDefault();
    this.loading = true;
    this.store.dispatch(new ConfirmUser({ email, code }));
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectUser)).subscribe(user => {
        if (user && user.confirmed) {
          this.router.navigate(this.navigateTo);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
