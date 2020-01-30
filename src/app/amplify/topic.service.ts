import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { Topic } from '@spaced-repetition/types/topic';
import { APIService } from '@spaced-repetition/API.service';
import { ApiStatus, ApiErrorType } from '@spaced-repetition/types/api-status';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Store, select } from '@ngrx/store';
import { CustomApiService } from './custom-api.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public constructor(
    private apiService: APIService,
    private customApiService: CustomApiService,
    private store: Store<AppState>
  ) {}

  filterCards(filter: string) {
    return this.customApiService.filterCards(filter);
  }

  public addTopic(name: string): Observable<ApiStatus<Topic>> {
    if (!name) {
      return of({ success: false, error: { message: 'Name cannot be empty', type: ApiErrorType.GenericAPIException } });
    }
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.apiService.CreateTopic({ user: user.email, name })),
      switchMap(res => of({ success: true, data: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while adding topic.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateTopic(id: string, name: string): Observable<ApiStatus<Topic>> {
    if (!name) {
      return of({ success: false, error: { message: 'Name cannot be empty', type: ApiErrorType.GenericAPIException } });
    }

    if (!id) {
      return of({ success: false, error: { message: 'Id cannot be empty', type: ApiErrorType.GenericAPIException } });
    }

    return from(this.apiService.UpdateTopic({ name, id })).pipe(
      switchMap(topic => of({ success: true, data: topic })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while updating topic.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }
}
