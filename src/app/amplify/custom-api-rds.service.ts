import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Box } from '@spaced-repetition/types/box';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '@spaced-repetition/reducers';
import { Observable, from } from 'rxjs';
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

  public filterTopicWithCards(filter: string): Observable<Card[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allTopics(user.email, 100, filter))
    );
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allStudyCards(user.email, true, 1000, 1))
    );
  }

  public getCardsByTopicId(topicId: string): Observable<Card[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allStudyCards(user.email, null, 1000, 1, topicId))
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

  public newCard(topicId: string, front: string, back: string): Observable<boolean> {
    return from(this.createCard(topicId, front, back));
  }

  public editCard(id: string, topicId: string, front: string, back: string): Observable<boolean> {
    return from(this.updateCard(id, topicId, front, back));
  }

  public updateCardToHard(topicId: string): Observable<boolean> {
    return from(this.updateCardRDSToHard(topicId));
  }

  public updateCardToEasy(topicId: string, box: Box): Observable<boolean> {
    return from(this.updateCardRDSToEasy(topicId, box));
  }

  public removeCard(id: string, topicId: string): Observable<boolean> {
    return from(this.deleteCard(id, topicId));
  }

  private async allStudyCards(
    userId: string,
    isReadyStudyOnly: boolean = null,
    limit = 100,
    page = 1,
    topicId: string = null
  ) {
    const statement = `
      query AllStudyCards($userId: String, $filter: String, $limit: Int, $page: Int, $isReadyStudyOnly: Boolean, $topicId: String) {
        allStudyCards(userId: $userId,
          filter: $filter,
          limit: $limit,
          page: $page,
          isReadyStudyOnly: $isReadyStudyOnly,
          topicId: $topicId
        ) {
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
    if (topicId) {
      gqlAPIServiceArguments.topicId = topicId;
    }

    if (isReadyStudyOnly !== null) {
      gqlAPIServiceArguments.isReadyStudyOnly = isReadyStudyOnly;
    }

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data.allStudyCards;
  }

  private async allTopics(userId: string, limit = 10, filter: string = null) {
    const statement = `
      query AllTopics($userId: String, $limit: Int, $filter: String) {
        allTopics(userId: $userId, limit: $limit, filter: $filter) {
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

    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }

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
      mutation CreateCard($topicId: String!, $front: String!, $back: String!) {
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
      mutation UpdateCard($id: String!, $topicId: String!, $front: String!, $back: String!){
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

  private async updateCardRDSToHard(id: string) {
    const statement = `
      mutation UpdateCardToHard($id: String!){
        updateCardRDSToHard(id: $id){
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.id = id;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async updateCardRDSToEasy(id: string, box: Box) {
    const statement = `
      mutation UpdateCardRDSToEasy($id: String!, $box: Box!){
        updateCardRDSToEasy(id: $id, box: $box) {
          success
        }
      }
    `;
    const gqlAPIServiceArguments: any = {};
    gqlAPIServiceArguments.id = id;
    gqlAPIServiceArguments.box = box;

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return response.data;
  }

  private async deleteCard(id: string, topicId: string) {
    const statement = `
      mutation DeleteCard($id: String!, $topicId: String!){
        deleteCardRDS(id: $id, topicId: $topicId){
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
