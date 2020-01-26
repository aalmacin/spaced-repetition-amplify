import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { makeBoxEasier } from '../main/shared/study.func';
import { getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Card } from '@spaced-repetition/types/card';
import { switchMap, filter, catchError, map } from 'rxjs/operators';
import { ApiError } from '@spaced-repetition/types/api-error';
import { APIService, Box } from '@spaced-repetition/API.service';
import { CustomApiService } from './custom-api.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(
    private customApiService: CustomApiService,
    private apiService: APIService,
    private store: Store<AppState>
  ) {}

  public getAllCards(): Observable<Card[]> {
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.customApiService.getCardsByUser(user)),
      catchError(() => null),
      filter((res: any) => !!res)
    );
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.getAllCards().pipe(map(cards => cards.filter(card => card.isReadyToStudy)));
  }

  public getCardsByTopicId(topicId: any): Observable<Card[]> {
    return this.store.pipe(select(selectUser)).pipe(
      switchMap(user => this.customApiService.getCardsByTopicId(user, topicId)),
      catchError(() => null),
      filter((res: any) => !!res)
    );
  }

  public addNewCard({ front, back, topicId }, pageTopicId = null): Observable<Card[] | ApiError> {
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
      switchMap(() => (!!!pageTopicId ? this.getAllCards() : this.getCardsByTopicId(pageTopicId))),
      catchError(() => of({ error: 'An error occured while adding a card.' }))
    );
  }

  public updateCard(
    { id, topicId, front, back }: { id: string; topicId: string; front: string; back: string },
    pageTopicId = null
  ): Observable<Card[] | ApiError> {
    return of({ id, front, back }).pipe(
      switchMap(card =>
        this.apiService.UpdateCard({
          ...card,
          cardTopicId: topicId,
          box: Box.VERY_HARD,
          lastStudy: getCurrentTimestamp()
        })
      ),
      switchMap(() => (!!!pageTopicId ? this.getAllCards() : this.getCardsByTopicId(pageTopicId))),
      catchError(() => of({ error: 'An error occured while updating the card.' }))
    );
  }

  public updateCardToEasy(card: Card) {
    return of(card).pipe(
      switchMap(({ id, box }) =>
        this.apiService.UpdateCard({
          id,
          box: makeBoxEasier(box),
          lastStudy: getCurrentTimestamp()
        })
      ),
      catchError(() => of({ error: 'Failed to update card.' }))
    );
  }

  public updateCardToHard(card: Card) {
    return of(card).pipe(
      switchMap(({ id }) =>
        this.apiService.UpdateCard({
          id,
          box: Box.VERY_HARD,
          lastStudy: getCurrentTimestamp()
        })
      ),
      catchError(() => of({ error: 'Failed to update card.' }))
    );
  }

  public deleteCard(cardId: string, pageTopicId = null): Observable<Card[] | ApiError> {
    return of(cardId).pipe(
      switchMap(id => this.deleteCardInAmplify(id)),
      switchMap(() => (!!!pageTopicId ? this.getAllCards() : this.getCardsByTopicId(pageTopicId))),
      catchError(() => of({ error: 'An error occured while deleting the card' }))
    );
  }

  private async deleteCardInAmplify(id: string) {
    const res = await this.apiService.DeleteCard({
      id
    });
    return res;
  }
}
