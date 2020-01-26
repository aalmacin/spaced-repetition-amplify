import { Action } from '@ngrx/store';
import { User } from './types/user';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserFailure = '[User] Load User Failure'
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

export type UserActions = LoadUser | LoadUserSuccess | LoadUserFailure;
