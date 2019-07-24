import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { makeBoxEasier } from '../main/shared/study.func';
import { AuthService } from './auth.service';
import { getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
import { Card } from '@spaced-repetition/types/card';
import { switchMap, filter, catchError, map } from 'rxjs/operators';
import { ApiError } from '@spaced-repetition/types/api-error';
import { APIService, Box } from '@spaced-repetition/API.service';
import { CustomApiService } from './custom-api.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(
    private customApiService: CustomApiService,
    private apiService: APIService,
    private authService: AuthService
  ) {}
  public getAllCards(): Observable<Card[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => this.customApiService.getCardsByUser(user)),
      catchError(() => null),
      filter((res: any) => !!res)
    );
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.getAllCards().pipe(map(cards => cards.filter(card => card.isReadyToStudy)));
  }

  public addNewCard({ front, back, topicId }): Observable<Card[] | ApiError> {
    return this.authService.getCurrentUser().pipe(
      switchMap(_ =>
        this.apiService.CreateCard({
          front,
          back,
          box: Box.VERY_HARD,
          cardTopicId: topicId,
          lastStudy: getCurrentTimestamp()
        })
      ),
      switchMap(() => this.getAllCards()),
      catchError(() => of({ error: 'An error occured while adding a card.' }))
    );
  }

  public updateCardToEasy(id, box) {
    const easierBox = makeBoxEasier(box);
    this.apiService.UpdateCard({
      id,
      box: easierBox,
      lastStudy: getCurrentTimestamp()
    });
  }

  public updateCardToHard(id, box) {
    this.apiService.UpdateCard({
      id,
      box: box.VERY_HARD,
      lastStudy: getCurrentTimestamp()
    });
  }

  public deleteCard(cardId: string): Observable<Card[] | ApiError> {
    return of(cardId).pipe(
      switchMap(id => this.deleteCardInAmplify(id)),
      switchMap(() => this.getAllCards()),
      catchError(() => of({ error: 'An error occured while deleting the card' }))
    );
  }

  public async updateCard(id: string, front: string, back: string) {
    this.apiService.UpdateCard({
      id,
      front,
      back,
      box: Box.VERY_HARD,
      lastStudy: getCurrentTimestamp()
    });
  }

  private async deleteCardInAmplify(id: string) {
    const res = await this.apiService.DeleteCard({
      id
    });
    return res;
  }
}
