import { Injectable } from '@angular/core';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { Topic } from '@spaced-repetition/types/topic';
import { APIService } from '@spaced-repetition/API.service';
import { ApiStatus } from '@spaced-repetition/types/api-status';
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

  public addTopic(name: string): Observable<ApiStatus<Topic>> {
    if (!name) {
      return of({ success: false, error: 'Name cannot be empty' });
    }
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.apiService.CreateTopic({ user: user.email, name })),
      switchMap(res => of({ success: true, data: res })),
      catchError(() => of({ success: false, error: 'An error occured while adding topic.' }))
    );
  }

  public updateTopic(id: string, name: string): Observable<ApiStatus<Topic>> {
    if (!name) {
      return of({ success: false, error: 'Name cannot be empty' });
    }

    if (!id) {
      return of({ success: false, error: 'Id cannot be empty' });
    }

    return from(this.apiService.UpdateTopic({ name, id })).pipe(
      switchMap(topic => of({ success: true, data: topic })),
      catchError(() => of({ success: false, error: 'An error occured while updating topic.' }))
    );
  }
}
