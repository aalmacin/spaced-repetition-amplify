import { Action } from '@ngrx/store';

export enum AppActionTypes {
  LoadApplication = '[App] Load Application'
}

export class LoadApplication implements Action {
  readonly type = AppActionTypes.LoadApplication;
}

export type AppActions = LoadApplication;
