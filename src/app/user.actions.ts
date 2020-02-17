import { Action } from '@ngrx/store';
import { User } from './types/user';
import { ErrorMessage } from './message.reducer';

export enum UserActionTypes {
  SignIn = '[User] Sign In',
  SignInSuccess = '[User] Sign In Success',
  SignInFailure = '[User] Sign In Failure',
  SignUp = '[User] Sign Up',
  SignUpSuccess = '[User] Sign Up Success',
  SignUpFailure = '[User] Sign Up Failure',
  ConfirmUser = '[User] Confirm User',
  ConfirmUserSuccess = '[User] Confirm User Success',
  ConfirmUserFailure = '[User] Confirm User Failure',
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

  public constructor(public readonly payload: { email: string; confirmed: boolean }) {}
}

export class SignInFailure implements Action {
  readonly type = UserActionTypes.SignInFailure;
  public constructor(public readonly payload: string) {}
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SignUp;

  public constructor(public readonly payload: SignUpPayload) {}
}

export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SignUpSuccess;

  public constructor(public readonly payload: User) {}
}

export class SignUpFailure implements Action {
  readonly type = UserActionTypes.SignUpFailure;

  public constructor(public readonly payload: string) {}
}

export interface ConfirmUserPayload {
  email: string;
  code: string;
}

export class ConfirmUser implements Action {
  readonly type = UserActionTypes.ConfirmUser;

  public constructor(public readonly payload: ConfirmUserPayload) {}
}

export class ConfirmUserSuccess implements Action {
  readonly type = UserActionTypes.ConfirmUserSuccess;
}

export class ConfirmUserFailure implements Action {
  readonly type = UserActionTypes.ConfirmUserFailure;
  public constructor(public readonly payload: string) {}
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
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | ConfirmUser
  | ConfirmUserSuccess
  | ConfirmUserFailure
  | SignOut
  | SignOutFailure
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure;
