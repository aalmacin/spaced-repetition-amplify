import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { User } from './user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user: User;
  signedIn: boolean;

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
      }
    });
  }
}
