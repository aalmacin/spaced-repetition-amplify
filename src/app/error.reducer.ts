import { Action } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export enum MessageContext {
  LOGIN,
  REGISTER,
  CONFIRM,
  HOME,
  STUDY
}

export interface ErrorMessage {
  context: MessageContext;
  message: string;
}

export interface SuccessMessage {
  context: MessageContext;
  message: string;
}

export interface MessageState {
  success: SuccessMessage[];
  errors: ErrorMessage[];
}

export const initialState: MessageState = {
  success: [],
  errors: []
};

export function messageReducer(state = initialState, action: UserActions): MessageState {
  switch (action.type) {
    case UserActionTypes.SignUpFailure:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}
