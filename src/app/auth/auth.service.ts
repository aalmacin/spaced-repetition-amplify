import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getCurrentUser(): Observable<User | null> {
    return defer(async () => this.getCurrentUserFromAmplify());
  }

  public login(email: string, password: string): Observable<User | null> {
    return defer(async () => this.loginToAmplify(email, password));
  }

  private async loginToAmplify(email, password) {
    try {
      const user = await Auth.signIn(email, password);
      return { email: user.attributes.email };
    } catch (error) {
      return null;
    }
  }

  private async getCurrentUserFromAmplify(): Promise<User | null> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return { email: user.attributes.email };
    } catch (error) {
      return null;
    }
  }
}
