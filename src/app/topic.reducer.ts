import { TopicWithCards } from './types/topic';
import { TopicActionTypes, TopicActions } from './topic.actions';

export type TopicState = TopicWithCards[];

export const initialState: TopicState = [];

export function topicReducer(state = initialState, action: TopicActions): TopicState {
  switch (action.type) {
    case TopicActionTypes.LoadTopicsSuccess:
      return [...action.payload];
    case TopicActionTypes.FilterCardsSuccess:
      return [...action.payload];
    case TopicActionTypes.LoadCardsForTopicSuccess:
      const topics = [...state];
      const topicIdx = topics.findIndex(t => t.id === action.payload.topicId);
      topics[topicIdx].cards = action.payload.cards;
      return [...topics];
    case TopicActionTypes.ResetTopicWithCards:
      return [];
    default:
      return state;
  }
}
