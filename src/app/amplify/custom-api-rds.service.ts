import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Box } from '@spaced-repetition/types/box';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser, selectFilter } from '@spaced-repetition/reducers';
import { Observable, from, combineLatest } from 'rxjs';
import { TopicWithCards, Topic } from '@spaced-repetition/types/topic';
import { switchMap } from 'rxjs/operators';
import { Card } from '@spaced-repetition/types/card';

@Injectable({
  providedIn: 'root'
})
export class CustomApiRdsService {
  public constructor(private store: Store<AppState>) {}

  public getTopics(): Observable<Topic[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.topics(user.email))
    );
  }

  public filterTopicWithCards(filter: string): Observable<TopicWithCards[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.topics(user.email, filter))
    );
  }

  public getAllStudyCards(): Observable<Card[]> {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.allStudyCards(user.email, true, 1000, 1))
    );
  }

  public getStudyCardCount() {
    return this.store.pipe(
      select(selectUser),
      switchMap(user => this.studyCardCount(user.email))
    );
  }

  public getCardsByTopicId(
    topicId: string,
    isReadyStudyOnly: boolean = null,
    limit = 1000,
    page = 1
  ): Observable<Card[]> {
    return combineLatest(this.store.select(selectUser), this.store.select(selectFilter)).pipe(
      switchMap(([user, filter]) => this.allStudyCards(user.email, isReadyStudyOnly, limit, page, topicId, filter))
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

  private async topics(userId: string, filter: string = null) {
    const statement = `
      query Topics($userId: String!, $filter: String) {
        topics(userId: $userId, filter: $filter) {
          id
          name
          cardCount
        }
      }
    `;

    const gqlAPIServiceArguments: any = {
      userId
    };

    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }

    try {
      const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
      return response.data.topics;
    } catch (e) {
      console.error(e);
      throw Error('Failed to query topics');
    }
  }

  private async allStudyCards(
    userId: string,
    isReadyStudyOnly: boolean = null,
    limit = 100,
    page = 1,
    topicId: string = null,
    filter: string = null
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

    if (filter !== null) {
      gqlAPIServiceArguments.filter = filter;
    }

    try {
      const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
      return response.data.allStudyCards;
    } catch (e) {
      console.error(e);
      throw Error('Failed to query all study cards');
    }
  }

  private async allTopics(userId: string, limit = 10, filter: string = null) {
    const statement = `
      query AllTopics($userId: String, $limit: Int, $filter: String) {
        allTopics(userId: $userId, limit: $limit, filter: $filter) {
          id
          name
          user
          cardCount
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

  private async studyCardCount(userId: string) {
    const statement = `
    query CardsToReviewCount($userId: String!) {
      cardsToReviewCount(userId: $userId)
    }
    `;
    const gqlAPIServiceArguments: any = {
      userId
    };

    try {
      const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
      return response.data.cardsToReviewCount;
    } catch (e) {
      console.error(e);
      throw Error('Failed to query study card count');
    }
  }
}
