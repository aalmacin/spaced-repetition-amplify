import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { defer, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getCurrentUser(): Observable<User | null> {
    return defer(async () => this.getCurrentUserFromAmplify());
  }

  public async getCurrentUserFromAmplify() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return { email: user.attributes.email };
    } catch (error) {
      return null;
    }
  }
}
