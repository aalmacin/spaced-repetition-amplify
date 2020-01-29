import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { switchMap } from 'rxjs/operators';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Store } from '@ngrx/store';
import { TopicWithCards } from '@spaced-repetition/types/topic';
import { Observable } from 'rxjs';
import { Card } from '@spaced-repetition/types/card';

@Injectable({
  providedIn: 'root'
})
export class CustomApiService {
  public constructor(private store: Store<AppState>) {}

  public getTopicWithCards(): Observable<TopicWithCards[]> {
    return this.store.select(selectUser).pipe(switchMap(user => this.topicWithCards(user.email)));
  }

  public filterCards(filter: string): Observable<TopicWithCards[]> {
    if (!filter) {
      return this.getTopicWithCards();
    }
    return this.store.select(selectUser).pipe(switchMap(user => this.filterCardsQuery(user.email, filter)));
  }

  public getCardsByUser(): Observable<Card[]> {
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

  private async topicWithCards(userId: string, filter?: string) {
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

  private async filterCardsQuery(userId: string, filter: string) {
    const statement = `query FilterTopicWithCards ($userId: String, $filter: String) {
      topicWithCards(userId: $userId, filter: $filter) {
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
    gqlAPIServiceArguments.filter = filter;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.topicWithCards;
  }
}
