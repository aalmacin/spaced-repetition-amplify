import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppActionTypes } from './app.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { LoadTopics, TopicActionTypes, LoadTopicsSuccess, LoadTopicsFailure } from './topic.actions';
import { TopicService } from './amplify/topic.service';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  @Effect()
  loadApplication$ = this.actions$.pipe(
    ofType(AppActionTypes.LoadApplication),
    switchMap(() => [new LoadTopics()])
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
  constructor(private actions$: Actions, private topicService: TopicService) {}
}
