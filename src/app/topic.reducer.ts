import { Topic } from './types/topic';
import { TopicActionTypes, TopicActions } from './topic.actions';

export type TopicState = Topic[];

export const initialState: TopicState = [];

export function topicReducer(state = initialState, action: TopicActions): TopicState {
  switch (action.type) {
    case TopicActionTypes.LoadTopicsSuccess:
      return action.payload;
    default:
      return state;
  }
}
