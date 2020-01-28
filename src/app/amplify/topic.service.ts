import { Injectable } from '@angular/core';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { Topic, TopicWithCards } from '@spaced-repetition/types/topic';
import { APIService } from '@spaced-repetition/API.service';
import { ApiError } from '@spaced-repetition/types/api-error';
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

  public getTopics(): Observable<Topic[]> {
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.customApiService.getCardsByUser()),
      filter((res: any) => res && res.items),
      map((res: any) =>
        res.items.map(item => ({
          id: item.id,
          name: item.name
        }))
      )
    );
  }

  public addTopic(name: string): Observable<TopicWithCards[] | ApiError> {
    if (!name) {
      return of({ error: 'Name cannot be empty' });
    }
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.apiService.CreateTopic({ user: user.email, name })),
      switchMap(() => this.customApiService.getTopicWithCards()),
      catchError(() => of({ error: 'An error occured while adding topic.' }))
    );
  }

  public updateTopic(id: string, name: string): Observable<Topic | ApiError> {
    if (!name) {
      return of({ error: 'Name cannot be empty' });
    }
    if (!id) {
      return of({ error: 'Id cannot be empty' });
    }
    return from(this.apiService.UpdateTopic({ name, id })).pipe(
      switchMap(topic => of(topic)),
      catchError(err => {
        return of({ error: 'An error occured while updating topic.' });
      })
    );
  }
}
