import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { topicReducer, TopicState } from '@spaced-repetition/topic.reducer';
import { userReducer, UserState } from '@spaced-repetition/user.reducer';

export interface AppState {
  topics: TopicState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: topicReducer,
  user: userReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTopics = (state: AppState) => state.topics;
export const selectUser = (state: AppState) => state.user;
