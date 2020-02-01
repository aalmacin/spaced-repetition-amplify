import { Action } from '@ngrx/store';

export interface ErrorState {
  messages: [];
  errors: [];
}

export const initialState: ErrorState = {};

export function errorReducer(state = initialState, action: Action): ErrorState {
  switch (action.type) {
    default:
      return state;
  }
}
