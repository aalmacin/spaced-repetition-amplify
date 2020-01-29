import { Injectable } from '@angular/core';
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
