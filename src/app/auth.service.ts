import { Injectable } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { Observable, of, from } from "rxjs";
import {  map } from "rxjs/operators";
import { User } from "./user";
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private amplifyService: AmplifyService) {}

  getAuth(): Observable<User | null> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(cognitoUser => ({ email: cognitoUser.attributes.email }))
    );
  }

  isSignedIn(): Observable<boolean> {
    return this.getAuth().pipe(
      map(user => !!user)
    );
  }
}
