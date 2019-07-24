import { Injectable } from '@angular/core';
import { ModelTopicFilterInput, ListTopicsQuery } from '@spaced-repetition/API.service';
import { API, graphqlOperation } from 'aws-amplify';
import { User } from '@spaced-repetition/types/user';
import { map, pipe, flatten, filter } from 'ramda';
import { isReadyToStudy, getNextStudyDate } from '@spaced-repetition/main/shared/study.func';
import { getDateFromTimestamp } from '@spaced-repetition/main/shared/timestamp.func';

@Injectable({
  providedIn: 'root'
})
export class CustomApiService {
  public async getCardsByUser(user: User) {
    const topics = await this.getTopics({ user: { eq: user.email } });
    return pipe(
      filter((r: any) => r.cards.items.length > 0),
      map((r: any) => map((rr: any) => ({ ...rr, topicName: r.name }), r.cards.items)),
      flatten,
      map((r: any) => ({
        ...r,
        isReadyToStudy: isReadyToStudy(r.lastStudy, r.box),
        nextStudyDate: getDateFromTimestamp(getNextStudyDate(r.lastStudy, r.box)),
        lastStudyDate: getDateFromTimestamp(r.lastStudy)
      }))
    )([...topics.items]);
  }

  private async getTopics(
    filtered?: ModelTopicFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTopicsQuery> {
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
}
