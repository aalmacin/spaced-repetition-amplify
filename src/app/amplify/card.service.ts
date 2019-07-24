import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { isReadyToStudy, getNextStudyDate, makeBoxEasier } from '../main/shared/study.func';
import { AuthService } from './auth.service';
import { getDateFromTimestamp, getCurrentTimestamp } from '@spaced-repetition/main/shared/timestamp.func';
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

  public async updateCard(id: string, front: string, back: string) {
    this.apiService.UpdateCard({
      id,
      front,
      back,
      box: Box.VERY_HARD,
      lastStudy: getCurrentTimestamp()
    });
  }

  public async deleteCard(id: string) {
    this.apiService.DeleteCard({
      id
    });
  }
}
