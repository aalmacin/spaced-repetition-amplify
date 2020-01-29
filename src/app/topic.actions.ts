import { Action } from '@ngrx/store';
import { TopicWithCards } from './types/topic';

export enum TopicActionTypes {
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
