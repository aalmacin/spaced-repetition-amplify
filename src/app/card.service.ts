import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Card, CardViewModel } from './card';
import { Box } from './study/Box';
import { isReadyToStudy } from './study/study.func';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public getCards(topicId: number, isReadyToStudyOnly: boolean): Observable<CardViewModel[]> {
    const cards: Card[] = [
      { id: 1, topicId: 1, front: 'What is life', back: '42', lastStudy: 1557792000, box: Box.EASY },
      { id: 2, topicId: 2, front: 'What is physics', back: 'Study of motion', lastStudy: 1557792000, box: Box.HARD },
      {
        id: 3,
        topicId: 3,
        front: 'What is typescript',
        back: 'Programming language',
        lastStudy: 1557792000,
        box: Box.VERY_HARD
      },
      {
        id: 4,
        topicId: 3,
        front: 'What is javascript',
        back: 'Programming language',
        lastStudy: 1557792000,
        box: Box.VERY_EASY
      }
    ];
    const filteredCards = cards
      .filter(card => card.topicId === topicId)

      .map(card => ({
        ...card,
        topicName: 'Programming',
        isReadyToStudy: isReadyToStudy(card)
      }));
    if (isReadyToStudyOnly) {
      return of(filteredCards.filter(c => c.isReadyToStudy));
    }
    return of(filteredCards);
  }
}
