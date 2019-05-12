import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private amplifyService: AmplifyService) {}

  getAuth(): Observable<User | null> {
    return this.amplifyService.authStateChange$.pipe(
      map(authState =>
        (authState.state === 'signedIn') ? {email: authState.user.attributes.email} : null
      )
    );
  }
}
