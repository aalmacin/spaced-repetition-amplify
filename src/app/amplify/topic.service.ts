import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiStatus, ApiErrorType } from '@spaced-repetition/types/api-status';
import { CustomApiRdsService } from './custom-api-rds.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public constructor(private customApiRdsService: CustomApiRdsService) {}

  getTopics() {
    return this.customApiRdsService.getTopics();
  }

  filterCards(filter: string) {
    return this.customApiRdsService.filterTopicWithCards(filter);
  }

  public addTopic(): Observable<ApiStatus<boolean>> {
    return this.customApiRdsService.newTopic('Untitled').pipe(
      switchMap(res => of({ success: res, data: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while adding topic.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateTopic(id: string, name: string): Observable<ApiStatus<boolean>> {
    if (!name) {
      return of({ success: false, error: { message: 'Name cannot be empty', type: ApiErrorType.GenericAPIException } });
    }

    if (!id) {
      return of({ success: false, error: { message: 'Id cannot be empty', type: ApiErrorType.GenericAPIException } });
    }

    return this.customApiRdsService.editTopic(id, name).pipe(
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
