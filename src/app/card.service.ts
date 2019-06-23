import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { CardViewModel } from './card';
import { Box } from './study/Box';
import { isReadyToStudy } from './study/study.func';
import { APIService } from './API.service';
import { API } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(private apiService: APIService) {}

  public getCards(topicId: string, isReadyToStudyOnly: boolean): Observable<CardViewModel[]> {
    return defer(async () => {
      const topic = await this.apiService.GetTopic(topicId);
      const cards = topic.cards.items.map(card => ({
        id: card.id,
        topicId: topic.id,
        front: card.front,
        back: card.back,
        lastStudy: card.lastStudy,
        box: Box[card.box],
        topicName: topic.name,
        isReadyToStudy: isReadyToStudy({
          id: card.id,
          topicId: topic.id,
          front: card.front,
          back: card.back,
          lastStudy: card.lastStudy,
          box: Box[card.box]
        })
      }));
      if (isReadyToStudyOnly) {
        return cards.filter(card => card.isReadyToStudy);
      }
      return cards;
    });
  }
}
