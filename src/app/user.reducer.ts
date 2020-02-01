import { User } from './types/user';
import { UserActions, UserActionTypes } from './user.actions';

export type UserState = User;

export const initialState: UserState = null;

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoadUserSuccess:
    case UserActionTypes.SignUpSuccess:
    case UserActionTypes.SignInSuccess:
    case UserActionTypes.SignInSuccess:
      return { ...state, email: action.payload.email, confirmed: action.payload.confirmed };
    case UserActionTypes.ConfirmUserSuccess:
      return null;
    case UserActionTypes.SignOut:
      return null;
    default:
      return state;
  }
}
