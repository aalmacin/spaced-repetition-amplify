import { Action } from '@ngrx/store';
import { Card } from './types/card';

export enum CardActionTypes {
  LoadStudyCards = '[Card] Load Cards',
  LoadStudyCardsSuccess = '[Card] Load Cards Success',
  LoadStudyCardsFailure = '[Card] Load Cards Failure'
}

export class LoadStudyCards implements Action {
  readonly type = CardActionTypes.LoadStudyCards;
}

export class LoadStudyCardsSuccess implements Action {
  readonly type = CardActionTypes.LoadStudyCardsSuccess;

  public constructor(public payload: Card[]) {}
}

export class LoadStudyCardsFailure implements Action {
  readonly type = CardActionTypes.LoadStudyCardsFailure;
}

export type CardActions = LoadStudyCards | LoadStudyCardsSuccess | LoadStudyCardsFailure;
