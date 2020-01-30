import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { topicReducer, TopicState } from '@spaced-repetition/topic.reducer';
import { userReducer, UserState } from '@spaced-repetition/user.reducer';
import { Topic } from '@spaced-repetition/types/topic';
import { CardState, cardReducer } from '@spaced-repetition/card.reducer';

export interface AppState {
  topics: TopicState;
  user?: UserState;
  studyCards: CardState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: topicReducer,
  user: userReducer,
  studyCards: cardReducer
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

export const selectStudyCards = (state: AppState) => state.studyCards;

export const selectReadyToStudyCards = createSelector(
  selectStudyCards,
  studyCards => studyCards.filter(c => c.isReadyToStudy)
);
