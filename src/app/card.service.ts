import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { CardViewModel } from './card';
import { isReadyToStudy } from './study/study.func';
import { APIService, ListTopicsQuery, ModelTopicFilterInput } from './API.service';
import { UserService } from './user.service';
import { API, graphqlOperation } from 'aws-amplify';
import { map, pipe, flatten, filter } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public constructor(private apiService: APIService, private userService: UserService) {}

  async GetCardsByUser(filter?: ModelTopicFilterInput, limit?: number, nextToken?: string): Promise<ListTopicsQuery> {
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
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
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

  public getAllCards(): Observable<any> {
    return defer(async () => {
      const user = await this.userService.getUserPromise();
      const topicService = await this.GetCardsByUser({
        user: { eq: user.email }
      });
      return pipe(
        filter((r: any) => r.cards.items.length > 0),
        map((r: any) => map((rr: any) => ({ ...rr, topicName: r.name }), r.cards.items)),
        flatten
      )([...topicService.items]);
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
}
