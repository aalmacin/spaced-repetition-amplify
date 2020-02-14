import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { topicReducer, TopicState } from '@spaced-repetition/topic.reducer';
import { userReducer, UserState } from '@spaced-repetition/user.reducer';
import { Topic } from '@spaced-repetition/types/topic';
import { CardState, cardReducer } from '@spaced-repetition/card.reducer';
import { loadingReducer, LoadingState } from '@spaced-repetition/loading.reducer';
import { MessageState, messageReducer, MessageContext } from '@spaced-repetition/message.reducer';

export interface AppState {
  topics: TopicState;
  user?: UserState;
  studyCards: CardState;
  loading: LoadingState;
  messages: MessageState;
}

export const reducers: ActionReducerMap<AppState> = {
  topics: topicReducer,
  user: userReducer,
  studyCards: cardReducer,
  loading: loadingReducer,
  messages: messageReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTopicWithCards = (state: AppState) => state.topics;
export const selectTopics = createSelector(
  selectTopicWithCards,
  (topicWithCards: TopicState): Topic[] => topicWithCards.map(({ id, name, cardCount }) => ({ id, name, cardCount }))
);
export const selectUser = (state: AppState) => state.user;

export const selectTopicsById = createSelector(
  selectTopicWithCards,
  (topicWithCards, topicId: string) => topicWithCards.find(topic => topic.id === topicId)
);

export const selectCardState = (state: AppState) => state.studyCards;

export const selectStudyCards = createSelector(
  selectCardState,
  (state: CardState) => state.cards
);

export const selectCardsToStudyCount = createSelector(
  selectCardState,
  (state: CardState) => state.cardsToStudyCount
);

export const selectLoading = (state: AppState) => state.loading;

export const selectFilter = createSelector(
  selectCardState,
  cardState => cardState.filter
);

export const selectReadyToStudyCards = createSelector(
  selectStudyCards,
  studyCards => studyCards.filter(c => c.isReadyToStudy)
);

export const selectMessages = (state: AppState) => state.messages;

export const selectErrors = createSelector(
  selectMessages,
  messages => messages.errors
);

export const selectSuccess = createSelector(
  selectMessages,
  messages => messages.success
);

export const selectSignInErrors = createSelector(
  selectErrors,
  errors => errors.filter(error => error.context === MessageContext.LOGIN).map(error => error.message)
);

export const selectSignUpErrors = createSelector(
  selectErrors,
  errors => errors.filter(error => error.context === MessageContext.REGISTER).map(error => error.message)
);

export const selectConfirmErrors = createSelector(
  selectErrors,
  errors => errors.filter(error => error.context === MessageContext.CONFIRM).map(error => error.message)
);

export const selectConfirmSuccess = createSelector(
  selectSuccess,
  successs => successs.filter(success => success.context === MessageContext.CONFIRM).map(success => success.message)
);
