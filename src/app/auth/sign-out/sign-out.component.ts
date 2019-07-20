import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@spaced-repetition/amplify/auth.service';

@Component({
  selector: 'app-auth-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public signOut(e: MouseEvent) {
    this.authService.logOut().subscribe(loggedOut => {
      if (loggedOut) {
        this.router.navigate(['/home']);
      }
    });
    e.preventDefault();
  }
}
