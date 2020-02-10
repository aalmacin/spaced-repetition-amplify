import { Action } from '@ngrx/store';
import { Card } from './types/card';

export enum CardActionTypes {
  LoadStudyCards = '[Card] Load Study Cards',
  LoadStudyCardsSuccess = '[Card] Load Study Cards Success',
  LoadStudyCardsFailure = '[Card] Load Study Cards Failure',
  LoadStudyCardCount = '[Card] Load Study Card Count',
  LoadStudyCardCountSuccess = '[Card] Load Study Card Count Success',
  LoadStudyCardCountFailure = '[Card] Load Study Card Count Failure',
  LoadStudyCardsForTopic = '[Card] Load Study Cards For Topic',
  LoadStudyCardsForTopicSuccess = '[Card] Load Study Cards For Topic Success',
  LoadStudyCardsForTopicFailure = '[Card] Load Study Cards For Topic Failure',
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
  UpdateCardToHardFailure = '[Card] Update Card To Hard Failure',
  ResetStudyCards = '[Card] Reset Study Cards'
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

export class LoadStudyCardsForTopic implements Action {
  readonly type = CardActionTypes.LoadStudyCardsForTopic;

  public constructor(public payload: string) {}
}

export class LoadStudyCardsForTopicSuccess implements Action {
  readonly type = CardActionTypes.LoadStudyCardsForTopicSuccess;

  public constructor(public payload: Card[]) {}
}

export class LoadStudyCardsForTopicFailure implements Action {
  readonly type = CardActionTypes.LoadStudyCardsForTopicFailure;
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

  public constructor(public readonly payload: string) {}
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

  public constructor(public readonly payload: string) {}
}

interface DeleteCardPayload {
  id: string;
  topicId: string;
}

export class DeleteCard implements Action {
  readonly type = CardActionTypes.DeleteCard;

  public constructor(public readonly payload: DeleteCardPayload) {}
}

export class DeleteCardSuccess implements Action {
  readonly type = CardActionTypes.DeleteCardSuccess;
}

export class DeleteCardFailure implements Action {
  readonly type = CardActionTypes.DeleteCardFailure;

  public constructor(public readonly payload: string) {}
}

export class UpdateCardToEasy implements Action {
  readonly type = CardActionTypes.UpdateCardToEasy;

  public constructor(public readonly payload: Card) {}
}

export class UpdateCardToEasySuccess implements Action {
  readonly type = CardActionTypes.UpdateCardToEasySuccess;
}

export class UpdateCardToEasyFailure implements Action {
  readonly type = CardActionTypes.UpdateCardToEasyFailure;

  public constructor(public readonly payload: string) {}
}

export class UpdateCardToHard implements Action {
  readonly type = CardActionTypes.UpdateCardToHard;

  public constructor(public readonly payload: Card) {}
}

export class UpdateCardToHardSuccess implements Action {
  readonly type = CardActionTypes.UpdateCardToHardSuccess;
}

export class UpdateCardToHardFailure implements Action {
  readonly type = CardActionTypes.UpdateCardToHardFailure;

  public constructor(public readonly payload: string) {}
}

export class ResetStudyCards implements Action {
  readonly type = CardActionTypes.ResetStudyCards;
}

export class LoadStudyCardCount implements Action {
  readonly type = CardActionTypes.LoadStudyCardCount;
}

export class LoadStudyCardCountSuccess implements Action {
  readonly type = CardActionTypes.LoadStudyCardCountSuccess;

  public constructor(public payload: number) {}
}

export class LoadStudyCardCountFailure implements Action {
  readonly type = CardActionTypes.LoadStudyCardCountFailure;
}

export type CardActions =
  | LoadStudyCards
  | LoadStudyCardsSuccess
  | LoadStudyCardsFailure
  | LoadStudyCardCount
  | LoadStudyCardCountSuccess
  | LoadStudyCardCountFailure
  | LoadStudyCardsForTopic
  | LoadStudyCardsForTopicSuccess
  | LoadStudyCardsForTopicFailure
  | AddCard
  | AddCardSuccess
  | AddCardFailure
  | UpdateCard
  | UpdateCardSuccess
  | UpdateCardFailure
  | DeleteCard
  | DeleteCardSuccess
  | DeleteCardFailure
  | UpdateCardToEasy
  | UpdateCardToEasySuccess
  | UpdateCardToEasyFailure
  | UpdateCardToHard
  | UpdateCardToHardSuccess
  | UpdateCardToHardFailure
  | ResetStudyCards;
