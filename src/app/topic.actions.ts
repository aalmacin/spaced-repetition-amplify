import { Action } from '@ngrx/store';
import { Topic } from './types/topic';

export enum TopicActionTypes {
  LoadTopics = '[Topic] Load Topics',
  LoadTopicsSuccess = '[Topic] Load Topics Success',
  LoadTopicsFailure = '[Topic] Load Topics Failure'
}

export class LoadTopics implements Action {
  readonly type = TopicActionTypes.LoadTopics;
}

export class LoadTopicsSuccess implements Action {
  readonly type = TopicActionTypes.LoadTopicsSuccess;

  constructor(public payload: Topic[]) {}
}

export class LoadTopicsFailure implements Action {
  readonly type = TopicActionTypes.LoadTopicsFailure;
}

export type TopicActions = LoadTopics | LoadTopicsSuccess | LoadTopicsFailure;
