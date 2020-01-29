import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { makeBoxEasier } from '../main/shared/study.func';
import { getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Card } from '@spaced-repetition/types/card';
import { switchMap, filter, catchError, map } from 'rxjs/operators';
import { APIService, Box } from '@spaced-repetition/API.service';
import { CustomApiService } from './custom-api.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { ApiStatus } from '@spaced-repetition/types/api-status';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(
    private customApiService: CustomApiService,
    private apiService: APIService,
    private store: Store<AppState>
  ) {}

  public getAllTopicWithCards() {
    return this.customApiService.getTopicWithCards();
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.customApiService.getCardsByUser();
  }

  public addNewCard({ front, back, topicId }: Partial<Card>): Observable<ApiStatus<Card[]>> {
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(_ =>
        this.apiService.CreateCard({
          front,
          back,
          box: Box.VERY_HARD,
          cardTopicId: topicId,
          lastStudy: getCurrentTimestamp()
        })
      ),
      map(() => ({ success: true })),
      catchError(() => of({ success: false, error: 'An error occured while adding a card.' }))
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
      catchError(() => of({ success: false, error: 'An error occured while updating the card.' }))
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
      catchError(() => of({ success: false, error: 'Failed to update card.' }))
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
      catchError(() => of({ success: false, error: 'Failed to update card.' }))
    );
  }

  public deleteCard(cardId: string): Observable<ApiStatus<Card[]>> {
    return of(cardId).pipe(
      switchMap(id => this.deleteCardInAmplify(id)),
      map(() => ({ success: true })),
      catchError(() => of({ success: false, error: 'An error occured while deleting the card' }))
    );
  }

  private async deleteCardInAmplify(id: string) {
    const res = await this.apiService.DeleteCard({
      id
    });
    return res;
  }
}
