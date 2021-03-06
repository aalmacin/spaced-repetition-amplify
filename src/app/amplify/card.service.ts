import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { makeBoxEasier } from '../main/shared/study.func';
import { Card } from '@spaced-repetition/types/card';
import { catchError, map } from 'rxjs/operators';
import { ApiStatus, ApiErrorType } from '@spaced-repetition/types/api-status';
import { CustomApiRdsService } from './custom-api-rds.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(private customApiRdsService: CustomApiRdsService) {}

  public getAllStudyCards(): Observable<Card[]> {
    return this.customApiRdsService.getAllStudyCards();
  }

  getStudyCardCount() {
    return this.customApiRdsService.getStudyCardCount();
  }

  public getAllStudyCardsByTopicId(topicId: string): Observable<ApiStatus<Card[]>> {
    return this.customApiRdsService.getCardsByTopicId(topicId).pipe(
      map(res => ({ success: true, data: res })),
      catchError(() =>
        of({
          success: false,
          error: {
            message: 'An error occured while getting all study cards by topic',
            type: ApiErrorType.GenericAPIException
          }
        })
      )
    );
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

  public updateCard({ id, topicId, front, back }: Partial<Card>): Observable<ApiStatus<boolean>> {
    return this.customApiRdsService.editCard(id, topicId, front, back).pipe(
      map(res => ({ success: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while updating the card.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateCardToEasy(card: Card): Observable<ApiStatus<Partial<boolean>>> {
    return this.customApiRdsService.updateCardToEasy(card.id, makeBoxEasier(card.box)).pipe(
      map(res => ({ success: true, data: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'Failed to update card to easy.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public updateCardToHard(card: Card): Observable<ApiStatus<Partial<boolean>>> {
    return this.customApiRdsService.updateCardToHard(card.id).pipe(
      map(res => ({ success: true, data: res })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'Failed to update card to hard.', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }

  public deleteCard(id: string, topicId: string): Observable<ApiStatus<Card[]>> {
    return this.customApiRdsService.removeCard(id, topicId).pipe(
      map(() => ({ success: true })),
      catchError(() =>
        of({
          success: false,
          error: { message: 'An error occured while deleting the card', type: ApiErrorType.GenericAPIException }
        })
      )
    );
  }
}
