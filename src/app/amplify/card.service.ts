import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { CardViewModel } from './card';
import { isReadyToStudy, getNextStudyDate } from '../main/functions/study.func';
import { API, graphqlOperation } from 'aws-amplify';
import { map, pipe, flatten, filter } from 'ramda';
import { AuthService } from './auth.service';
import { getDateFromTimestamp, getCurrentTimestamp } from '@spaced-repetition/main/functions/timestamp.func';
import { APIService, ModelTopicFilterInput, ListTopicsQuery, Box } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(private apiService: APIService, private authService: AuthService) {}

  async GetCardsByUser(filtered?: ModelTopicFilterInput, limit?: number, nextToken?: string): Promise<ListTopicsQuery> {
    const statement = `
      query GetCardsByUser($filter: ModelTopicFilterInput, $limit: Int, $nextToken: String) {
        listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            user
            cards {
              items {
                __typename
                id
                front
                back
                lastStudy
                box
              }
            }
          }
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    if (filtered) {
      gqlAPIServiceArguments.filter = filtered;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.listTopics as ListTopicsQuery;
  }

  private async getCardsFromAmplify() {
    const user = await this.authService.getCurrentUser().toPromise();
    const topicService = await this.GetCardsByUser({
      user: { eq: user.email }
    });
    return pipe(
      filter((r: any) => r.cards.items.length > 0),
      map((r: any) => map((rr: any) => ({ ...rr, topicName: r.name }), r.cards.items)),
      flatten,
      map(r => ({
        ...r,
        nextStudy: getDateFromTimestamp(getNextStudyDate(r))
      }))
    )([...topicService.items]);
  }

  public getAllCards(): Observable<any> {
    return defer(async () => {
      const cards = await this.getCardsFromAmplify();
      return cards;
    });
  }

  public getAllStudyCards(): Observable<any> {
    return defer(async () => {
      const cards = await this.getCardsFromAmplify();
      return filter((r: any) => isReadyToStudy(r))(cards);
    });
  }

  public getCards(topicId: string, isReadyToStudyOnly: boolean): Observable<CardViewModel[]> {
    return defer(async () => {
      const topic = await this.apiService.GetTopic(topicId);
      const cards = topic.cards.items.map(card => ({
        id: card.id,
        topicId: topic.id,
        front: card.front,
        back: card.back,
        lastStudy: card.lastStudy,
        box: card.box,
        topicName: topic.name,
        isReadyToStudy: isReadyToStudy({
          id: card.id,
          topicId: topic.id,
          front: card.front,
          back: card.back,
          lastStudy: card.lastStudy,
          box: card.box
        })
      }));
      if (isReadyToStudyOnly) {
        return cards.filter(card => card.isReadyToStudy);
      }
      return cards;
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
