import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { defer, Observable } from 'rxjs';
import { User } from '../types/user';
import { ApiStatus } from '@spaced-repetition/types/api-status';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getCurrentUser(): Observable<ApiStatus<User | null>> {
    return defer(async () => this.getCurrentUserFromAmplify());
  }

  public login(email: string, password: string): Observable<ApiStatus<User | null>> {
    return defer(async () => this.loginToAmplify(email, password));
  }

  public logOut(): Observable<boolean> {
    return defer(async () => this.logoutToAmplify());
  }

  public register({ email, password }: { email: string; password: string }): Observable<ApiStatus<User | null>> {
    return defer(async () => this.registerToAmplify(email, password));
  }

  public confirmUser(email: string, code: string): Observable<ApiStatus<User | null>> {
    return defer(async () => this.confirmUserInAmplify(email, code));
  }

  private async logoutToAmplify() {
    const result = await Auth.signOut({ global: true })
      .then(() => true)
      .catch(() => false);
    return result;
  }

  private async loginToAmplify(email, password): Promise<ApiStatus<User | null>> {
    try {
      const user = await Auth.signIn(email, password);
      return { data: { email: user.attributes.email }, success: true };
    } catch (error) {
      return (
        (error.message && { success: false, error: error.message }) || { success: false, error: 'An error occured' }
      );
    }
  }

  private async registerToAmplify(email, password): Promise<ApiStatus<User | null>> {
    try {
      const res = await Auth.signUp(email, password);
      return { data: { email: res.user.getUsername() }, success: true };
    } catch (error) {
      return (
        (error.message && { error: error.message, success: false }) || { error: 'An error occured', success: false }
      );
    }
  }

  private async confirmUserInAmplify(email, code) {
    try {
      const res = await Auth.confirmSignUp(email, code);
      return res;
    } catch (error) {
      console.log(error);
      return (error.message && { error: error.message }) || { error: 'An error occured' };
    }
  }

  private async getCurrentUserFromAmplify(): Promise<ApiStatus<User | null>> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return { data: { email: user.attributes.email }, success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
