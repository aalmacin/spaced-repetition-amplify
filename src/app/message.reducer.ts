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
    case UserActionTypes.ConfirmUserSuccess:
      return { ...state, success: [{ message: 'Successfully confirmed', context: MessageContext.CONFIRM }] };
    case UserActionTypes.SignInFailure:
      return { ...state, errors: [{ message: action.payload, context: MessageContext.LOGIN }] };
    case UserActionTypes.ConfirmUserFailure:
      return { ...state, errors: [{ message: action.payload, context: MessageContext.CONFIRM }] };
    case UserActionTypes.SignUpFailure:
      return { ...state, errors: [{ message: action.payload, context: MessageContext.REGISTER }] };
    default:
      return state;
  }
}
