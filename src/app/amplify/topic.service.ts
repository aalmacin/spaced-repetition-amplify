import { Injectable } from '@angular/core';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Observable, defer, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Topic } from '@spaced-repetition/types/topic';
import { APIService } from '@spaced-repetition/API.service';
import { ApiError } from '@spaced-repetition/types/api-error';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public constructor(private apiService: APIService, private userService: AuthService) {}

  public getTopics(): Observable<Topic[]> {
    return this.userService.getCurrentUser().pipe(
      switchMap(user => this.apiService.ListTopics({ user: { eq: user.email } }, 99999)),
      filter((res: any) => res && res.items),
      map((res: any) =>
        res.items.map(item => ({
          id: item.id,
          name: item.name
        }))
      )
    );
  }

  public addTopic(name: string): Observable<Topic[] | ApiError> {
    if (!name) {
      return of({ error: 'Name cannot be empty' });
    }
    return this.userService.getCurrentUser().pipe(
      switchMap(user => this.apiService.CreateTopic({ user: user.email, name })),
      switchMap(() => this.getTopics()),
      catchError(() => of({ error: 'An error occured while adding topic.' }))
    );
  }
}
