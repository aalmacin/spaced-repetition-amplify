import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  user: User;
  signedIn: boolean;

  @ViewChild('mobileNavToggler')
  private mobileNav: ElementRef;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.pipe(select(selectUser)).subscribe(user => {
        if (user && !user.confirmed) {
          this.router.navigate(['/auth', 'confirm']);
        }
        if (!user) {
          this.router.navigate(['/auth', 'signin']);
        }
        if (user && user.confirmed) {
          this.user = user;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMobileNav() {
    this.mobileNav.nativeElement.click();
  }
}
