import { Action } from '@ngrx/store';
import { TopicWithCards } from './types/topic';

export enum TopicActionTypes {
  LoadTopics = '[Topic] Load Topics',
  LoadTopicsSuccess = '[Topic] Load Topics Success',
  LoadTopicsFailure = '[Topic] Load Topics Failure',
  AddTopic = '[Topic] Add Topic',
  AddTopicSuccess = '[Topic] Add Topic Success',
  AddTopicFailure = '[Topic] Add Topic Failure'
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

export type TopicActions =
  | LoadTopics
  | LoadTopicsSuccess
  | LoadTopicsFailure
  | AddTopic
  | AddTopicSuccess
  | AddTopicFailure;
