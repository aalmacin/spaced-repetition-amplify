import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { topicReducer, TopicState } from '@spaced-repetition/topic.reducer';
import { userReducer, UserState } from '@spaced-repetition/user.reducer';
import { TopicWithCards, Topic } from '@spaced-repetition/types/topic';

export interface AppState {
  topics: TopicState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: topicReducer,
  user: userReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTopicWithCards = (state: AppState) => state.topics;
export const selectTopics = createSelector(
  selectTopicWithCards,
  (topicWithCards: TopicState): Topic[] => topicWithCards.map(({ id, name }) => ({ id, name }))
);
export const selectUser = (state: AppState) => state.user;

export const selectTopicsById = createSelector(
  selectTopicWithCards,
  (topicWithCards, topicId: string) => topicWithCards.find(topic => topic.id === topicId)
);
