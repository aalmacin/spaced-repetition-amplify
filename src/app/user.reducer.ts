import { User } from './types/user';
import { UserActions, UserActionTypes } from './user.actions';

export type UserState = User;

export const initialState: UserState = {
  email: ''
};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoadUserSuccess:
      return { ...action.payload };
    default:
      return state;
  }
}
