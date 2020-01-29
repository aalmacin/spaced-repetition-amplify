import { Action } from '@ngrx/store';
import { Card } from './types/card';

export enum CardActionTypes {
  LoadStudyCards = '[Card] Load Study Cards',
  LoadStudyCardsSuccess = '[Card] Load Study Cards Success',
  LoadStudyCardsFailure = '[Card] Load Study Cards Failure',
  AddCard = '[Card] Add Card',
  AddCardSuccess = '[Card] Add Card Success',
  AddCardFailure = '[Card] Add Card Failure',
  UpdateCard = '[Card] Update Card',
  UpdateCardSuccess = '[Card] Update Card Success',
  UpdateCardFailure = '[Card] Update Card Failure',
  DeleteCard = '[Card] Delete Card',
  DeleteCardSuccess = '[Card] Delete Card Success',
  DeleteCardFailure = '[Card] Delete Card Failure',
  UpdateCardToEasy = '[Card] Update Card To Easy',
  UpdateCardToEasySuccess = '[Card] Update Card To Easy Success',
  UpdateCardToEasyFailure = '[Card] Update Card To Easy Failure',
  UpdateCardToHard = '[Card] Update Card To Hard',
  UpdateCardToHardSuccess = '[Card] Update Card To Hard Success',
  UpdateCardToHardFailure = '[Card] Update Card To Hard Failure'
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

type AddCardPayload = {
  front: string;
  back: string;
  topicId: string;
  reverseCard: boolean;
};

type UpdateCardPayload = {
  id: string;
  front: string;
  back: string;
  topicId: string;
};

export class AddCard implements Action {
  readonly type = CardActionTypes.AddCard;

  public constructor(public readonly payload: AddCardPayload) {}
}

export class AddCardSuccess implements Action {
  readonly type = CardActionTypes.AddCardSuccess;
}

export class AddCardFailure implements Action {
  readonly type = CardActionTypes.AddCardFailure;
}

export class UpdateCard implements Action {
  readonly type = CardActionTypes.UpdateCard;

  public constructor(public readonly payload: UpdateCardPayload) {}
}

export class UpdateCardSuccess implements Action {
  readonly type = CardActionTypes.UpdateCardSuccess;
}

export class UpdateCardFailure implements Action {
  readonly type = CardActionTypes.UpdateCardFailure;
}

export class DeleteCard implements Action {
  readonly type = CardActionTypes.DeleteCard;

  public constructor(public readonly payload: string) {}
}

export class DeleteCardSuccess implements Action {
  readonly type = CardActionTypes.DeleteCardSuccess;
}

export class DeleteCardFailure implements Action {
  readonly type = CardActionTypes.DeleteCardFailure;
}

export class UpdateCardToEasy implements Action {
  readonly type = CardActionTypes.UpdateCardToEasy;

  public constructor(public readonly payload: Card) {}
}

export class UpdateCardToEasySuccess implements Action {
  readonly type = CardActionTypes.UpdateCardToEasySuccess;

  public constructor(public readonly payload: Partial<Card>) {}
}

export class UpdateCardToEasyFailure implements Action {
  readonly type = CardActionTypes.UpdateCardToEasyFailure;
}

export class UpdateCardToHard implements Action {
  readonly type = CardActionTypes.UpdateCardToHard;

  public constructor(public readonly payload: Card) {}
}

export class UpdateCardToHardSuccess implements Action {
  readonly type = CardActionTypes.UpdateCardToHardSuccess;
  public constructor(public readonly payload: Partial<Card>) {}
}

export class UpdateCardToHardFailure implements Action {
  readonly type = CardActionTypes.UpdateCardToHardFailure;
}

export type CardActions =
  | LoadStudyCards
  | LoadStudyCardsSuccess
  | LoadStudyCardsFailure
  | AddCard
  | AddCardSuccess
  | AddCardFailure
  | UpdateCard
  | UpdateCardSuccess
  | UpdateCardFailure
  | UpdateCardToEasy
  | UpdateCardToEasySuccess
  | UpdateCardToEasyFailure
  | UpdateCardToHard
  | UpdateCardToHardSuccess
  | UpdateCardToHardFailure;
