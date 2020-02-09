import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Box } from '@spaced-repetition/types/box';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Observable } from 'rxjs';
import { TopicWithCards } from '@spaced-repetition/types/topic';
import { switchMap } from 'rxjs/operators';
import { Card } from '@spaced-repetition/types/card';

@Injectable({
  providedIn: 'root'
})
export class CustomApiRdsService {
  public constructor(private store: Store<AppState>) {}

  public getTopicWithCards(): Observable<TopicWithCards[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allTopics(user.email, 100))
    );
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allStudyCards(user.email, true, 1000, 1))
    );
  }

  public newTopic(name): Observable<boolean> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.createTopic(name, user.email))
    );
  }

  public editTopic(id: string, name: string): Observable<boolean> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.updateTopic(id, name, user.email))
    );
  }

  private async allStudyCards(userId: string, isReadyStudyOnly: boolean = null, limit = 100, page = 1) {
    const statement = `
      query AllStudyCards($userId: String, $filter: String, $limit: Int, $page: Int, $isReadyStudyOnly: Boolean) {
        allStudyCards(userId: $userId, filter: $filter, limit: $limit, page: $page, isReadyStudyOnly: $isReadyStudyOnly) {
          id
          front
          back
          box
          lastStudy
          topicName
          topicId
          isReadyToStudy
          nextStudy
          nextStudyDate
          lastStudyDate
        }
      }
    `;
    const gqlAPIServiceArguments: any = {
      userId,
      limit,
      page,
      isReadyStudyOnly
    };

    if (isReadyStudyOnly !== null) {
      gqlAPIServiceArguments.isReadyStudyOnly = isReadyStudyOnly;
    }

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.allStudyCards;
  }

  private async allTopics(userId: string, limit = 10) {
    const statement = `
      query AllTopics($userId: String, $limit: Int) {
        allTopics(userId: $userId, limit: $limit) {
          id
          name
          user
          cards {
            id
            front
            back
            lastStudy
            box
            topic
          }
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.userId = userId;
    gqlAPIServiceArguments.limit = limit;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.allTopics;
  }

  private async createTopic(name: string, userId: string) {
    const statement = `
      mutation CreateTopic($name: String!, $userId: String!) {
        createTopicRDS(name: $name, userId: $userId) {
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.name = name;
    gqlAPIServiceArguments.userId = userId;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async updateTopic(id: string, name: string, userId: string) {
    const statement = `
      mutation UpdateTopic($id: String!, $name: String!, $userId: String!) {
        updateTopicRDS(id: $id, name: $name, userId: $userId) {
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.id = id;
    gqlAPIServiceArguments.name = name;
    gqlAPIServiceArguments.userId = userId;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async createCard(topicId: string, front: string, back: string) {
    const statement = `
      mutation CreateCard($topicId: String, $front: String, $back: String) {
        createCardRDS(topicId: $topicId, front: $front, back: $back) {
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.topicId = topicId;
    gqlAPIServiceArguments.front = front;
    gqlAPIServiceArguments.back = back;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async updateCard(id: string, topicId: string, front: string, back: string) {
    const statement = `
      mutation UpdateCard($id: String, $topicId: String, $front: String, $back: String){
        updateCardRDS(id: $id, topicId: $topicId, front: $front, back: $back){
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.id = id;
    gqlAPIServiceArguments.topicId = topicId;
    gqlAPIServiceArguments.front = front;
    gqlAPIServiceArguments.back = back;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async updateCardRDSToHard(topicId: string) {
    const statement = `
      mutation UpdateCardToHard($topicId: String){
        updateCardRDSToHard(topicId: $topicId){
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.topicId = topicId;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async updateCardRDSToEasy(topicId: string, box: Box) {
    const statement = `
      mutation UpdateCardRDSToEasy($topicId: String, $box: Box){
        updateCardRDSToEasy(topicId: $topicId, box: $box) {
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.topicId = topicId;
    gqlAPIServiceArguments.box = box;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async deleteCard(id: string, topicId: string) {
    const statement = `
      mutation DeleteCard($id: String, $topicId: String){
        deleteCardRDS(id: $id, topicId: $topicId!){
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.id = id;
    gqlAPIServiceArguments.topicId = topicId;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }
}
