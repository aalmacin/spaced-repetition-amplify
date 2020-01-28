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
import { of } from 'rxjs';
import { UserActionTypes, LoadUserSuccess, LoadUserFailure, LoadUser } from './user.actions';
import { AuthService } from './amplify/auth.service';
import { CardService } from './amplify/card.service';
import { LoadStudyCardsSuccess, CardActionTypes, LoadStudyCardsFailure, LoadStudyCards } from './card.actions';
import { TopicService } from './amplify/topic.service';

@Injectable()
export class AppEffects {
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
  addTopicSuccess$ = this.actions$.pipe(
    ofType(TopicActionTypes.AddTopicSuccess),
    map(() => new LoadTopics())
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
  updateTopicSuccess$ = this.actions$.pipe(
    ofType(TopicActionTypes.UpdateTopicSuccess),
    map(() => new LoadTopics())
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
