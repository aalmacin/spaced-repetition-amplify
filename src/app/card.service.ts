import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Card } from './card';
import { Box } from './study/Box';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public getCards(topicId: number): Observable<Card[]> {
    const cards: Card[] = [
      { id: 1, topicId: 1, front: 'What is life', back: '42', lastStudy: 1557792000, box: Box.EASY },
      { id: 2, topicId: 2, front: 'What is physics', back: 'Study of motion', lastStudy: 1557792000, box: Box.HARD },
      { id: 3, topicId: 3, front: 'What is typescript', back: 'Programming language', lastStudy: 1557792000, box: Box.REGULAR },
      { id: 4, topicId: 3, front: 'What is javascript', back: 'Programming language', lastStudy: 1557792000, box: Box.VERY_EASY }
    ];
    const filteredCards = cards.filter(card => card.topicId === topicId);
    return of(filteredCards);
  }
}
