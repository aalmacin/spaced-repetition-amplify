import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppActionTypes } from './app.actions';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import {
  LoadTopics,
  TopicActionTypes,
  LoadTopicsSuccess,
  LoadTopicsFailure,
  AddTopicFailure,
  AddTopicSuccess,
  UpdateTopicSuccess,
  UpdateTopicFailure,
  UpdateTopic
} from './topic.actions';
import { of, combineLatest } from 'rxjs';
import { UserActionTypes, LoadUserSuccess, LoadUserFailure, LoadUser } from './user.actions';
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
  UpdateCardToHardFailure
} from './card.actions';
import { TopicService } from './amplify/topic.service';

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
      const createAddCard$ = values => this.cardService.addNewCard(values).pipe(filter(res => res.success));
      if (cardValues.reverseCard) {
        return combineLatest(
          createAddCard$(cardValues),
          createAddCard$({ topicId: cardValues.topicId, front: cardValues.back, back: cardValues.front })
        ).pipe(
          filter(([res1, res2]) => res1.success && res2.success),
          map(() => new AddCardSuccess()),
          catchError(() => of(new AddCardFailure()))
        );
      }
      return createAddCard$(cardValues).pipe(
        filter(res => res.success),
        map(() => new AddCardSuccess()),
        catchError(() => of(new AddCardFailure()))
      );
    })
  );

  @Effect()
  updateCard$ = this.actions$.pipe(
    ofType<UpdateCard>(CardActionTypes.UpdateCard),
    map(action => action.payload),
    switchMap(cardValues => {
      return this.cardService.updateCard(cardValues).pipe(
        filter(res => res.success),
        map(() => new UpdateCardSuccess()),
        catchError(() => of(new UpdateCardFailure()))
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
      this.topicService.addTopic('Untitled').pipe(
        filter(res => res.success),
        map(() => new AddTopicSuccess()),
        catchError(() => of(new AddTopicFailure()))
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
        filter(res => res.success),
        map(() => new UpdateTopicSuccess()),
        catchError(() => of(new UpdateTopicFailure()))
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
  loadUserSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserSuccess),
    switchMap(() => [new LoadTopics(), new LoadStudyCards()])
  );
  constructor(
    private actions$: Actions,
    private topicService: TopicService,
    private cardService: CardService,
    private authService: AuthService
  ) {}
}
