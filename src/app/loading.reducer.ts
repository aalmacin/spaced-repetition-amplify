import { Action } from '@ngrx/store';
import { TopicActions, TopicActionTypes } from './topic.actions';
import { UserActions, UserActionTypes } from './user.actions';
import { CardActions, CardActionTypes } from './card.actions';

export type LoadingState = boolean;

export const initialState: LoadingState = false;

export function loadingReducer(state = initialState, action: TopicActions | CardActions | UserActions): LoadingState {
  switch (action.type) {
    case UserActionTypes.ConfirmUser:
    case UserActionTypes.LoadUser:
    case UserActionTypes.SignIn:
    case UserActionTypes.SignOut:
    case UserActionTypes.SignUp:
    case TopicActionTypes.AddTopic:
    case TopicActionTypes.FilterCards:
    case TopicActionTypes.LoadTopics:
    case TopicActionTypes.UpdateTopic:
    case CardActionTypes.AddCard:
    case CardActionTypes.DeleteCard:
    case CardActionTypes.LoadStudyCards:
    case CardActionTypes.LoadStudyCardsForTopic:
    case CardActionTypes.UpdateCard:
    case CardActionTypes.UpdateCardToEasy:
    case CardActionTypes.UpdateCardToHard:
      return true;
    case UserActionTypes.ConfirmUserSuccess:
    case UserActionTypes.ConfirmUserFailure:
    case UserActionTypes.LoadUserSuccess:
    case UserActionTypes.LoadUserFailure:
    case UserActionTypes.SignInSuccess:
    case UserActionTypes.SignInFailure:
    case UserActionTypes.SignUp:
    case UserActionTypes.SignUpSuccess:
    case UserActionTypes.SignUpFailure:
    case TopicActionTypes.AddTopicSuccess:
    case TopicActionTypes.AddTopicFailure:
    case TopicActionTypes.FilterCardsSuccess:
    case TopicActionTypes.FilterCardsFailure:
    case TopicActionTypes.LoadTopicsSuccess:
    case TopicActionTypes.LoadTopicsFailure:
    case TopicActionTypes.ResetTopicWithCards:
    case TopicActionTypes.UpdateTopicSuccess:
    case TopicActionTypes.UpdateTopicFailure:
    case CardActionTypes.AddCardSuccess:
    case CardActionTypes.AddCardFailure:
    case CardActionTypes.DeleteCardSuccess:
    case CardActionTypes.DeleteCardFailure:
    case CardActionTypes.LoadStudyCardsForTopicSuccess:
    case CardActionTypes.LoadStudyCardsForTopicFailure:
    case CardActionTypes.LoadStudyCardsSuccess:
    case CardActionTypes.LoadStudyCardsFailure:
    case CardActionTypes.ResetStudyCards:
    case CardActionTypes.UpdateCardSuccess:
    case CardActionTypes.UpdateCardFailure:
    case CardActionTypes.UpdateCardToEasySuccess:
    case CardActionTypes.UpdateCardToEasyFailure:
    case CardActionTypes.UpdateCardToHardSuccess:
    case CardActionTypes.UpdateCardToHardFailure:
      return false;
    default:
      return state;
  }
}
