import { Card } from './types/card';
import { CardActions, CardActionTypes } from './card.actions';
import { TopicActionTypes, TopicActions } from './topic.actions';

export type CardState = {
  cards: Card[];
  filter?: string;
  cardsToStudyCount: number;
};

export const initialState: CardState = {
  cards: [],
  filter: null,
  cardsToStudyCount: 0
};

export function cardReducer(state = initialState, action: CardActions | TopicActions): CardState {
  switch (action.type) {
    case TopicActionTypes.FilterCards:
      return { ...state, filter: action.payload };
    case TopicActionTypes.ClearFilter:
      return { ...state, filter: null };
    case CardActionTypes.LoadStudyCardCountSuccess:
      return { ...state, cardsToStudyCount: action.payload };
    case CardActionTypes.LoadStudyCardsSuccess:
      return { ...state, cards: [...action.payload] };
    case CardActionTypes.LoadStudyCardsForTopicSuccess:
      return { ...state, cards: [...action.payload] };
    case CardActionTypes.ResetStudyCards:
      return { ...state, cards: [] };
    default:
      return state;
  }
}
