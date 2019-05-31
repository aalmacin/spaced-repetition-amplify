import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  signedIn: boolean;

  constructor(private amplifyService: AmplifyService, router: ActivatedRoute) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
      }
    });
    this.signedIn = true;
    this.user = { email: 'molly@molly.ca' };
  }
}
