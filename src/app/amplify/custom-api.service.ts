import { Injectable } from '@angular/core';
import { ModelTopicFilterInput, ListTopicsQuery } from '@spaced-repetition/API.service';
import { API, graphqlOperation } from 'aws-amplify';
import { switchMap } from 'rxjs/operators';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CustomApiService {
  public constructor(private store: Store<AppState>) {}

  public getTopicWithCards() {
    return this.store.select(selectUser).pipe(switchMap(user => this.topicWithCards(user.email)));
  }

  public getCardsByUser() {
    return this.store.select(selectUser).pipe(switchMap(user => this.getStudyCards(user.email, 5000)));
  }

  private async getStudyCards(userId: string, limit = 10) {
    const statement = `
      query GetStudyCards($userId: String, $limit: Int) {
        studyCards(userId: $userId, limit: $limit) {
          id
          front
          back
          lastStudy
          box
          topicId
          isReadyToStudy
          nextStudyDate
          lastStudyDate
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.userId = userId;

    gqlAPIServiceArguments.limit = limit;
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.studyCards;
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
            cards(limit: 5000) {
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

  private async topicWithCards(userId: string) {
    const statement = `query TopicWithCards ($userId: String) {
      topicWithCards(userId: $userId) {
        id
        name
        cards {
          id
          front
          back
          lastStudy
          box
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.userId = userId;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.topicWithCards;
  }
}
