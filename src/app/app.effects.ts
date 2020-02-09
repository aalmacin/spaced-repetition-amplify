import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppActionTypes, LoadApplication } from './app.actions';
import { switchMap, catchError, map, filter, tap } from 'rxjs/operators';
import {
  LoadTopics,
  TopicActionTypes,
  LoadTopicsSuccess,
  LoadTopicsFailure,
  AddTopicFailure,
  AddTopicSuccess,
  UpdateTopicSuccess,
  UpdateTopicFailure,
  UpdateTopic,
  ResetTopicWithCards,
  FilterCards,
  FilterCardsFailure,
  FilterCardsSuccess
} from './topic.actions';
import { of, combineLatest } from 'rxjs';
import {
  UserActionTypes,
  LoadUserSuccess,
  LoadUserFailure,
  LoadUser,
  SignOutFailure,
  SignIn,
  SignInFailure,
  SignInSuccess,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  ConfirmUser,
  ConfirmUserSuccess,
  ConfirmUserFailure
} from './user.actions';
import { AuthService } from './amplify/auth.service';
import { CardService } from './amplify/card.service';
import {
  LoadStudyCardsSuccess,
  CardActionTypes,
  LoadStudyCardsFailure,
  LoadStudyCards,
  AddCard,
  AddCardSuccess,
  AddCardFailure,
  UpdateCard,
  UpdateCardSuccess,
  UpdateCardFailure,
  DeleteCard,
  DeleteCardSuccess,
  DeleteCardFailure,
  UpdateCardToEasy,
  UpdateCardToEasySuccess,
  UpdateCardToEasyFailure,
  UpdateCardToHard,
  UpdateCardToHardSuccess,
  UpdateCardToHardFailure,
  ResetStudyCards,
  LoadStudyCardsForTopic,
  LoadStudyCardsForTopicSuccess,
  LoadStudyCardsForTopicFailure
} from './card.actions';
import { TopicService } from './amplify/topic.service';
import { ApiErrorType } from './types/api-status';

@Injectable()
export class AppEffects {
  @Effect()
  updateCardToEasy$ = this.actions$.pipe(
    ofType<UpdateCardToEasy>(CardActionTypes.UpdateCardToEasy),
    map(action => action.payload),
    switchMap(cardValues => {
      return this.cardService.updateCardToEasy(cardValues).pipe(
        filter(res => res.success),
        map(res => new UpdateCardToEasySuccess(res.data)),
        catchError(() => of(new UpdateCardToEasyFailure()))
      );
    })
  );

  @Effect()
  updateCardToHard$ = this.actions$.pipe(
    ofType<UpdateCardToHard>(CardActionTypes.UpdateCardToHard),
    map(action => action.payload),
    switchMap(cardValues => {
      return this.cardService.updateCardToHard(cardValues).pipe(
        filter(res => res.success),
        map(res => new UpdateCardToHardSuccess(res.data)),
        catchError(() => of(new UpdateCardToHardFailure()))
      );
    })
  );

  @Effect()
  addCard$ = this.actions$.pipe(
    ofType<AddCard>(CardActionTypes.AddCard),
    map(action => action.payload),
    switchMap(cardValues => {
      const createAddCard$ = values => this.cardService.addNewCard(values);
      if (cardValues.reverseCard) {
        return combineLatest(
          createAddCard$(cardValues),
          createAddCard$({ topicId: cardValues.topicId, front: cardValues.back, back: cardValues.front })
        ).pipe(
          map(([res1, res2]) =>
            res1.success && res2.success
              ? new AddCardSuccess()
              : new AddCardFailure('res1 error: ' + res1.error.message + ' | res2 error: ' + res2.error.message)
          ),
          catchError(() => of(new AddCardFailure('Failed creating card')))
        );
      }
      return createAddCard$(cardValues).pipe(
        map(res => (res.success ? new AddCardSuccess() : new AddCardFailure(res.error.message))),
        catchError(() => of(new AddCardFailure('Failed creating card')))
      );
    })
  );

  @Effect()
  updateCard$ = this.actions$.pipe(
    ofType<UpdateCard>(CardActionTypes.UpdateCard),
    map(action => action.payload),
    switchMap(cardValues => {
      return this.cardService.updateCard(cardValues).pipe(
        map(res => (res.success ? new UpdateCardSuccess() : new UpdateCardFailure(res.error.message))),
        catchError(() => of(new UpdateCardFailure('Failed updating card')))
      );
    })
  );

  @Effect()
  deleteCard$ = this.actions$.pipe(
    ofType<DeleteCard>(CardActionTypes.DeleteCard),
    map(action => action.payload),
    switchMap(cardId => {
      return this.cardService.deleteCard(cardId).pipe(
        filter(res => res.success),
        map(() => new DeleteCardSuccess()),
        catchError(() => of(new DeleteCardFailure()))
      );
    })
  );

  @Effect()
  addTopic$ = this.actions$.pipe(
    ofType(TopicActionTypes.AddTopic),
    switchMap(() =>
      this.topicService.addTopic().pipe(
        map(res => (res.success ? new AddTopicSuccess() : new AddTopicFailure(res.error.message))),
        catchError(() => of(new AddTopicFailure('An error occured.')))
      )
    )
  );

  @Effect()
  reloadTopics$ = this.actions$.pipe(
    ofType(
      TopicActionTypes.AddTopicSuccess,
      TopicActionTypes.UpdateTopicSuccess,
      CardActionTypes.AddCardSuccess,
      CardActionTypes.UpdateCardSuccess,
      CardActionTypes.DeleteCardSuccess
    ),
    map(() => new LoadTopics())
  );

  @Effect()
  reloadStudyCards$ = this.actions$.pipe(
    ofType(CardActionTypes.AddCardSuccess, CardActionTypes.UpdateCardSuccess, CardActionTypes.DeleteCardSuccess),
    map(() => new LoadStudyCards())
  );

  @Effect()
  updateTopic$ = this.actions$.pipe(
    ofType<UpdateTopic>(TopicActionTypes.UpdateTopic),
    map(action => action.payload),
    switchMap(action =>
      this.topicService.updateTopic(action.id, action.name).pipe(
        map(res => (res.success ? new UpdateTopicSuccess() : new UpdateTopicFailure(res.error.message))),
        catchError(() => of(new UpdateTopicFailure('Failed Updating topic')))
      )
    )
  );

  @Effect()
  loadApplication$ = this.actions$.pipe(
    ofType(AppActionTypes.LoadApplication),
    map(() => new LoadUser())
  );

  @Effect()
  loadTopics$ = this.actions$.pipe(
    ofType(TopicActionTypes.LoadTopics),
    switchMap(() =>
      this.cardService.getAllTopicWithCards().pipe(
        map(res => new LoadTopicsSuccess(res)),
        catchError(() => of(new LoadTopicsFailure()))
      )
    )
  );

  @Effect()
  filterCards$ = this.actions$.pipe(
    ofType<FilterCards>(TopicActionTypes.FilterCards),
    map(action => action.payload),
    switchMap(searchStr =>
      this.topicService.filterCards(searchStr).pipe(
        map(res => new FilterCardsSuccess(res)),
        catchError(() => of(new FilterCardsFailure()))
      )
    )
  );

  @Effect()
  loadStudyCards$ = this.actions$.pipe(
    ofType(CardActionTypes.LoadStudyCards),
    switchMap(() =>
      this.cardService.getAllStudyCards().pipe(
        map(res => new LoadStudyCardsSuccess(res)),
        catchError(() => of(new LoadStudyCardsFailure()))
      )
    )
  );

  @Effect()
  loadStudyCardsForTopic$ = this.actions$.pipe(
    ofType<LoadStudyCardsForTopic>(CardActionTypes.LoadStudyCardsForTopic),
    map(action => action.payload),
    switchMap(topicId =>
      this.cardService.getAllStudyCardsByTopicId(topicId).pipe(
        map(res => new LoadStudyCardsForTopicSuccess(res)),
        catchError(() => of(new LoadStudyCardsForTopicFailure()))
      )
    )
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUser),
    switchMap(() =>
      this.authService.getCurrentUser().pipe(
        map(res => {
          if (res.success) {
            return new LoadUserSuccess(res.data);
          }
          return new LoadUserFailure();
        }),
        catchError(() => of(new LoadUserFailure()))
      )
    )
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType<SignIn>(UserActionTypes.SignIn),
    map(action => action.payload),
    switchMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
        map(res => {
          if (res.success) {
            return new SignInSuccess({ email: res.data.email, confirmed: true });
          }
          if (res.error && res.error.type === ApiErrorType.UserNotConfirmedException) {
            return new SignInSuccess({ email, confirmed: false });
          }
          return new SignInFailure(res.error.message);
        }),
        catchError(res => of(new SignInFailure(res.message || 'An error occured')))
      )
    )
  );

  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.SignInSuccess),
    switchMap(() => [new LoadApplication()])
  );

  @Effect()
  confirmUser$ = this.actions$.pipe(
    ofType<ConfirmUser>(UserActionTypes.ConfirmUser),
    map(action => action.payload),
    switchMap(({ email, code }) =>
      this.authService.confirmUser(email, code).pipe(
        map(res =>
          res.success ? new ConfirmUserSuccess() : new ConfirmUserFailure(res.error.message || 'An error occured')
        ),
        catchError(res => of(new ConfirmUserFailure(res.message || 'An error occured')))
      )
    )
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<SignUp>(UserActionTypes.SignUp),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.register(payload).pipe(
        map(res => (res.success ? new SignUpSuccess(res.data) : new SignUpFailure(res.error.message))),
        catchError(res => of(new SignUpFailure(res.message || 'An error occured')))
      )
    )
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(UserActionTypes.SignOut),
    switchMap(() =>
      this.authService.logOut().pipe(
        switchMap(() => [new ResetStudyCards(), new ResetTopicWithCards()]),
        catchError(() => of(new SignOutFailure()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private topicService: TopicService,
    private cardService: CardService,
    private authService: AuthService
  ) {}
}
