import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { defer, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;

  public constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  public get currentUser() {
    return this.currentUserSubject.getValue();
  }

  public getCurrentUser(): Observable<User | null> {
    return defer(async () => {
      const user = await this.getCurrentUserFromAmplify();
      if (user) {
        this.currentUserSubject.next(user);
      }
      return user;
    });
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
