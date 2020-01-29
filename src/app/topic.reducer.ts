import { TopicWithCards } from './types/topic';
import { TopicActionTypes, TopicActions } from './topic.actions';

export type TopicState = TopicWithCards[];

export const initialState: TopicState = [];

export function topicReducer(state = initialState, action: TopicActions): TopicState {
  switch (action.type) {
    case TopicActionTypes.LoadTopicsSuccess:
      return action.payload;
    case TopicActionTypes.ResetTopicWithCards:
      return [];
    default:
      return state;
  }
}
