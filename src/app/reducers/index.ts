import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { topicReducer, TopicState } from '@spaced-repetition/topic.reducer';

export interface AppState {
  topics: TopicState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: topicReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTopics = (state: AppState) => state.topics;
