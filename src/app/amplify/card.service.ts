import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { makeBoxEasier } from '../main/shared/study.func';
import { getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Card } from '@spaced-repetition/types/card';
import { switchMap, catchError, map } from 'rxjs/operators';
import { APIService, Box } from '@spaced-repetition/API.service';
import { CustomApiService } from './custom-api.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { ApiStatus, ApiErrorType } from '@spaced-repetition/types/api-status';
import { CustomApiRdsService } from './custom-api-rds.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(
    private customApiService: CustomApiService,
    private customApiRdsService: CustomApiRdsService,
    private apiService: APIService,
    private store: Store<AppState>
  ) {}

  public getAllTopicWithCards() {
    return this.customApiRdsService.getTopicWithCards();
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.customApiRdsService.getAllStudyCards();
  }

  public getAllStudyCardsByTopicId(topicId: string): Observable<Card[]> {
    return this.customApiService.getCardsByTopicId(topicId);
  }

  public addNewCard({ front, back, topicId }: Partial<Card>): Observable<ApiStatus<boolean>> {
    return this.customApiRdsService.newCard(topicId, front, back).pipe(
      map(res => ({ success: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while adding a card.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateCard({ id, topicId, front, back }: Partial<Card>): Observable<ApiStatus<Card[]>> {
    return of({ id, front, back }).pipe(
      switchMap(card =>
        this.apiService.UpdateCard({
          ...card,
          cardTopicId: topicId,
          box: Box.VERY_HARD,
          lastStudy: getCurrentTimestamp()
        })
      ),
      map(() => ({ success: true })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while updating the card.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateCardToEasy(card: Card): Observable<ApiStatus<Partial<Card>>> {
    return of(card).pipe(
      switchMap(({ id, box }) =>
        this.apiService.UpdateCard({
          id,
          box: makeBoxEasier(box),
          lastStudy: getCurrentTimestamp()
        })
      ),
      map(res => ({ success: true, data: res })),
      catchError(() =>
        of({ success: false, error: { message: 'Failed to update card.', type: ApiErrorType.GenericAPIException } })
      )
    );
  }

  public updateCardToHard(card: Card): Observable<ApiStatus<Partial<Card>>> {
    return of(card).pipe(
      switchMap(({ id }) =>
        this.apiService.UpdateCard({
          id,
          box: Box.VERY_HARD,
          lastStudy: getCurrentTimestamp()
        })
      ),
      map(res => ({ success: true, data: res })),
      catchError(() =>
        of({ success: false, error: { message: 'Failed to update card.', type: ApiErrorType.GenericAPIException } })
      )
    );
  }

  public deleteCard(cardId: string): Observable<ApiStatus<Card[]>> {
    return of(cardId).pipe(
      switchMap(id => this.deleteCardInAmplify(id)),
      map(() => ({ success: true })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while deleting the card', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  private async deleteCardInAmplify(id: string) {
    const res = await this.apiService.DeleteCard({
      id
    });
    return res;
  }
}
