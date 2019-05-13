import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  signedIn = false;
  constructor(public authService: AuthService) {
    authService.isSignedIn().subscribe(signedIn => {
      this.signedIn = signedIn;
    });
  }
}
