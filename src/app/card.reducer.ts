import { Card } from './types/card';
import { CardActions, CardActionTypes } from './card.actions';

export type CardState = {
  cards: Card[];
  cardsToStudyCount: number;
};

export const initialState: CardState = {
  cards: [],
  cardsToStudyCount: 0
};

export function cardReducer(state = initialState, action: CardActions): CardState {
  switch (action.type) {
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
