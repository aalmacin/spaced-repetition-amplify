import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable, of, from } from 'rxjs';
import { User } from '../types/user';
import { ApiStatus, ApiErrorType } from '@spaced-repetition/types/api-status';
import { catchError, map } from 'rxjs/operators';
import { SignUpPayload } from '@spaced-repetition/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getCurrentUser(): Observable<ApiStatus<User>> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(user => ({ data: { email: user.attributes.email, confirmed: user.userConfirmed }, success: true })),
      catchError(error =>
        of({
          success: false,
          error: {
            message: error.message || 'An Error Occured',
            type: error.ApiErrorType
          }
        })
      )
    );
  }

  public login(email: string, password: string): Observable<ApiStatus<User>> {
    return from(Auth.signIn(email, password)).pipe(
      map(user => ({ data: { email: user.attributes.email, confirmed: user.userConfirmed }, success: true })),
      catchError(error =>
        of({
          success: false,
          error: {
            message: error.message || 'An Error Occured',
            type: error.name || ApiErrorType.GenericAPIException,
            data: { email, confirmed: false }
          }
        })
      )
    );
  }

  public logOut(): Observable<boolean> {
    return from(Auth.signOut({ global: true })).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public register({ email, password }: SignUpPayload): Observable<ApiStatus<User>> {
    return from(Auth.signUp(email, password)).pipe(
      map(
        res => ({ data: { email: res.user.getUsername(), confirmed: res.userConfirmed }, success: true }),
        catchError(error =>
          of({
            error: { message: (error && error.message) || 'An error occured', type: ApiErrorType.GenericAPIException },
            success: false
          })
        )
      )
    );
  }

  public confirmUser(email: string, code: string): Observable<ApiStatus<User>> {
    return from(Auth.confirmSignUp(email, code)).pipe(
      map(res => ({ success: true, data: { email: res.user.getUsername(), confirmed: res.userConfirmed } })),
      catchError(error =>
        of({
          error: { message: (error && error.message) || 'An error occured', type: ApiErrorType.GenericAPIException },
          success: false
        })
      )
    );
  }
}
