import { Component, Input } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public loading = false;
  public errors: string[] = [];

  @Input()
  private navigateTo: string[] = ['/auth', 'confirm'];
  constructor(private authService: AuthService, private router: Router) {}

  public register(e: MouseEvent, email: string, password: string, confirmPassword: string) {
    e.preventDefault();
    if (password !== confirmPassword) {
      this.errors = ['Password did not match with confirmation'];
      return;
    }
    this.loading = true;
    this.authService.register({ email, password }).subscribe((res: any) => {
      if (res.error) {
        this.errors = [res.error];
      } else {
        this.router.navigate(this.navigateTo);
      }
    });
  }
}
