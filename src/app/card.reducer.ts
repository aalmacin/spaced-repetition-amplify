import { Card } from './types/card';
import { CardActions, CardActionTypes } from './card.actions';

export type CardState = Card[];

export const initialState: CardState = [];

export function cardReducer(state = initialState, action: CardActions): CardState {
  switch (action.type) {
    case CardActionTypes.LoadStudyCardsSuccess:
      return [...action.payload];
    default:
      return state;
  }
}
