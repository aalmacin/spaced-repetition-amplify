import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public getCards(topicId: number): Observable<Card[]> {
    switch(topicId) {
      case 1:
        return of([{ front: 'What is life', back: '42' }]);
      case 2:
        return of([{ front: 'What is physics', back: 'Study of motion' }]);
      case 3:
        return of([{ front: 'What is typescript', back: 'Programming language' }]);
      default:
        return of([]);
    }
  }
}
