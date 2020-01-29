import { Action } from '@ngrx/store';
import { User } from './types/user';

export enum UserActionTypes {
  SignIn = '[User] Sign In',
  SignInSuccess = '[User] Sign In Success',
  SignInFailure = '[User] Sign In Failure',
  SignOut = '[User] Sign Out',
  SignOutFailure = '[User] Sign Out Failure',
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserFailure = '[User] Load User Failure'
}

export type SignInPayload = {
  email: string;
  password: string;
};

export class SignIn implements Action {
  readonly type = UserActionTypes.SignIn;

  public constructor(public readonly payload: SignInPayload) {}
}

export class SignInSuccess implements Action {
  readonly type = UserActionTypes.SignInSuccess;

  public constructor(public readonly payload: string) {}
}

export class SignInFailure implements Action {
  readonly type = UserActionTypes.SignInFailure;
}

export class SignOut implements Action {
  readonly type = UserActionTypes.SignOut;
}

export class SignOutFailure implements Action {
  readonly type = UserActionTypes.SignOutFailure;
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LoadUserSuccess;

  constructor(public payload: User) {}
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LoadUserFailure;
}

export type UserActions =
  | SignIn
  | SignInSuccess
  | SignInFailure
  | SignOut
  | SignOutFailure
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure;
