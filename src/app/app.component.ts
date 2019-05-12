import { Component } from "@angular/core";
import { AuthService } from './auth.service';
import { User } from './user';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  user: User;

  constructor(private authService: AuthService, private amplifyService: AmplifyService) {
    this.authService.getAuth().subscribe(a => {
      console.log(a);
    })


    this.amplifyService.authStateChange$.subscribe(authState => {
      console.log(authState.user);
    });
  }
}
