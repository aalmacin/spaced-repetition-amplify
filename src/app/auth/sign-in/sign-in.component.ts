import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public loading = false;
  public errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  signIn(event: any, email: string, password: string) {
    event.preventDefault();
    this.loading = true;
    this.authService.login(email, password).subscribe(user => {
      if (user) {
        this.router.navigate(['/main', 'dashboard']);
      } else {
        this.loading = false;
        this.errors.push('Login failed');
      }
    });
  }
}
