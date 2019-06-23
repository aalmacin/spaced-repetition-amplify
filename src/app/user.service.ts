import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { User } from './user';
import { Auth } from 'aws-amplify';
import { Observable, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getUser(): Observable<User> {
    return defer(this.getUserPromise);
  }

  public async getUserPromise() {
    const user = await Auth.currentAuthenticatedUser();
    return { email: user.attributes.email };
  }
}
