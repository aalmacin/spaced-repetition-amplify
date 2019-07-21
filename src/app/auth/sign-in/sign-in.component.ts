import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@spaced-repetition/amplify/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public loading = false;
  public errors: string[] = [];

  @Input()
  private navigateTo: string[] = ['/app', 'dashboard'];

  constructor(private authService: AuthService, private router: Router) {}

  signIn(event: any, email: string, password: string) {
    event.preventDefault();
    this.loading = true;
    this.authService.login(email, password).subscribe(user => {
      if (user) {
        this.router.navigate(this.navigateTo);
      } else {
        this.loading = false;
        this.errors.push('Login failed');
      }
    });
  }
}
