import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppActionTypes } from './app.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { LoadTopics, TopicActionTypes, LoadTopicsSuccess, LoadTopicsFailure } from './topic.actions';
import { TopicService } from './amplify/topic.service';
import { of } from 'rxjs';
import { UserActionTypes, LoadUserSuccess, LoadUserFailure, LoadUser } from './user.actions';
import { AuthService } from './amplify/auth.service';

@Injectable()
export class AppEffects {
  @Effect()
  loadApplication$ = this.actions$.pipe(
    ofType(AppActionTypes.LoadApplication),
    switchMap(() => [new LoadUser()])
  );

  @Effect()
  loadTopics$ = this.actions$.pipe(
    ofType(TopicActionTypes.LoadTopics),
    switchMap(() =>
      this.topicService.getTopics().pipe(
        map(res => new LoadTopicsSuccess(res)),
        catchError(() => of(new LoadTopicsFailure()))
      )
    )
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUser),
    switchMap(() =>
      this.authService.getCurrentUser().pipe(
        map(res => new LoadUserSuccess(res)),
        catchError(() => of(new LoadUserFailure()))
      )
    )
  );

  @Effect()
  loadUserSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserSuccess),
    switchMap(() => [new LoadTopics()])
  );
  constructor(private actions$: Actions, private topicService: TopicService, private authService: AuthService) {}
}
