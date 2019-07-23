import { Component, Input } from '@angular/core';
import { AuthService } from '@spaced-repetition/amplify/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  public loading = false;
  public errors: string[] = [];

  @Input()
  private navigateTo: string[] = ['/app', 'dashboard'];

  constructor(private authService: AuthService, private router: Router) {}

  confirm(event: MouseEvent, email: string, code: string) {
    event.preventDefault();
    this.loading = true;
    this.authService.confirmUser(email, code).subscribe((res: any) => {
      this.loading = false;
      if (res.error) {
        this.errors = [res.error];
      } else {
        this.router.navigate(this.navigateTo);
      }
    });
  }
}
