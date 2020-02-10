import { Action } from '@ngrx/store';
import { TopicWithCards } from './types/topic';
import { Card } from './types/card';

export enum TopicActionTypes {
  LoadCardsForTopic = '[Topic] Load Cards For Topic',
  LoadCardsForTopicSuccess = '[Topic] Load Cards For Topic Success',
  LoadCardsForTopicFailure = '[Topic] Load Cards For Topic Failure',
  LoadTopics = '[Topic] Load Topics',
  LoadTopicsSuccess = '[Topic] Load Topics Success',
  LoadTopicsFailure = '[Topic] Load Topics Failure',
  AddTopic = '[Topic] Add Topic',
  AddTopicSuccess = '[Topic] Add Topic Success',
  AddTopicFailure = '[Topic] Add Topic Failure',
  UpdateTopic = '[Topic] Update Topic',
  UpdateTopicSuccess = '[Topic] Update Topic Success',
  UpdateTopicFailure = '[Topic] Update Topic Failure',
  ResetTopicWithCards = '[Topic] Reset Topic With Cards',
  FilterCards = '[Topic] Filter Cards',
  FilterCardsSuccess = '[Topic] Filter Cards Success',
  FilterCardsFailure = '[Topic] Filter Cards Failure'
}

export class LoadCardsForTopic implements Action {
  readonly type = TopicActionTypes.LoadCardsForTopic;

  constructor(public payload: string) {}
}

export interface LoadCardsForTopicSuccessPayload {
  topicId: string;
  cards: Card[];
}

export class LoadCardsForTopicSuccess implements Action {
  readonly type = TopicActionTypes.LoadCardsForTopicSuccess;

  constructor(public payload: LoadCardsForTopicSuccessPayload) {}
}

export class LoadCardsForTopicFailure implements Action {
  readonly type = TopicActionTypes.LoadCardsForTopicFailure;

  constructor(public payload: string) {}
}

export class LoadTopics implements Action {
  readonly type = TopicActionTypes.LoadTopics;
}

export class LoadTopicsSuccess implements Action {
  readonly type = TopicActionTypes.LoadTopicsSuccess;

  constructor(public payload: TopicWithCards[]) {}
}

export class LoadTopicsFailure implements Action {
  readonly type = TopicActionTypes.LoadTopicsFailure;
}

export class AddTopic implements Action {
  readonly type = TopicActionTypes.AddTopic;
}

export class AddTopicSuccess implements Action {
  readonly type = TopicActionTypes.AddTopicSuccess;
}

export class AddTopicFailure implements Action {
  readonly type = TopicActionTypes.AddTopicFailure;

  constructor(public readonly payload: string) {}
}

export class UpdateTopic implements Action {
  readonly type = TopicActionTypes.UpdateTopic;

  constructor(public readonly payload: { id: string; name: string }) {}
}

export class UpdateTopicSuccess implements Action {
  readonly type = TopicActionTypes.UpdateTopicSuccess;
}

export class UpdateTopicFailure implements Action {
  readonly type = TopicActionTypes.UpdateTopicFailure;
  constructor(public readonly payload: string) {}
}

export class ResetTopicWithCards implements Action {
  readonly type = TopicActionTypes.ResetTopicWithCards;
}

export class FilterCards implements Action {
  readonly type = TopicActionTypes.FilterCards;

  constructor(public readonly payload: string) {}
}

export class FilterCardsSuccess implements Action {
  readonly type = TopicActionTypes.FilterCardsSuccess;

  constructor(public readonly payload: TopicWithCards[]) {}
}

export class FilterCardsFailure implements Action {
  readonly type = TopicActionTypes.FilterCardsFailure;
}

export type TopicActions =
  | LoadCardsForTopic
  | LoadCardsForTopicSuccess
  | LoadCardsForTopicFailure
  | LoadTopics
  | LoadTopicsSuccess
  | LoadTopicsFailure
  | AddTopic
  | AddTopicSuccess
  | AddTopicFailure
  | UpdateTopic
  | UpdateTopicSuccess
  | UpdateTopicFailure
  | ResetTopicWithCards
  | FilterCards
  | FilterCardsSuccess
  | FilterCardsFailure;
