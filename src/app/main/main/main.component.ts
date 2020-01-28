import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';

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

  // TODO: Check if this can be replaced by ngrx
  constructor(private amplifyService: AmplifyService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.amplifyService.authStateChange$.subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user.attributes;
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
