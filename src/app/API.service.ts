/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import * as Observable from 'zen-observable';

export type CreateTopicInput = {
  id?: string | null;
  name: string;
  user: string;
};

export enum Box {
  VERY_HARD = 'VERY_HARD',
  HARD = 'HARD',
  REGULAR = 'REGULAR',
  EASY = 'EASY',
  VERY_EASY = 'VERY_EASY'
}

export type UpdateTopicInput = {
  id: string;
  name?: string | null;
  user?: string | null;
};

export type DeleteTopicInput = {
  id?: string | null;
};

export type CreateCardInput = {
  id?: string | null;
  front: string;
  back: string;
  lastStudy?: number | null;
  box?: Box | null;
  cardTopicId?: string | null;
};

export type UpdateCardInput = {
  id: string;
  front?: string | null;
  back?: string | null;
  lastStudy?: number | null;
  box?: Box | null;
  cardTopicId?: string | null;
};

export type DeleteCardInput = {
  id?: string | null;
};

export type ModelTopicFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  user?: ModelStringFilterInput | null;
  and?: Array<ModelTopicFilterInput | null> | null;
  or?: Array<ModelTopicFilterInput | null> | null;
  not?: ModelTopicFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelCardFilterInput = {
  id?: ModelIDFilterInput | null;
  front?: ModelStringFilterInput | null;
  back?: ModelStringFilterInput | null;
  lastStudy?: ModelIntFilterInput | null;
  box?: ModelBoxFilterInput | null;
  and?: Array<ModelCardFilterInput | null> | null;
  or?: Array<ModelCardFilterInput | null> | null;
  not?: ModelCardFilterInput | null;
};

export type ModelIntFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBoxFilterInput = {
  eq?: Box | null;
  ne?: Box | null;
};

export type CreateTopicMutation = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type UpdateTopicMutation = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type DeleteTopicMutation = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type CreateCardMutation = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type UpdateCardMutation = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type DeleteCardMutation = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type GetTopicQuery = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type ListTopicsQuery = {
  __typename: 'ModelTopicConnection';
  items: Array<{
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetCardQuery = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type ListCardsQuery = {
  __typename: 'ModelCardConnection';
  items: Array<{
    __typename: 'Card';
    id: string;
    front: string;
    back: string;
    topic: {
      __typename: 'Topic';
      id: string;
      name: string;
      user: string;
    } | null;
    lastStudy: number | null;
    box: Box | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateTopicSubscription = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnUpdateTopicSubscription = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnDeleteTopicSubscription = {
  __typename: 'Topic';
  id: string;
  name: string;
  user: string;
  cards: {
    __typename: 'ModelCardConnection';
    items: Array<{
      __typename: 'Card';
      id: string;
      front: string;
      back: string;
      lastStudy: number | null;
      box: Box | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateCardSubscription = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type OnUpdateCardSubscription = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

export type OnDeleteCardSubscription = {
  __typename: 'Card';
  id: string;
  front: string;
  back: string;
  topic: {
    __typename: 'Topic';
    id: string;
    name: string;
    user: string;
    cards: {
      __typename: 'ModelCardConnection';
      nextToken: string | null;
    } | null;
  } | null;
  lastStudy: number | null;
  box: Box | null;
};

@Injectable({
  providedIn: 'root'
})
export class APIService {
  async CreateTopic(input: CreateTopicInput): Promise<CreateTopicMutation> {
    const statement = `mutation CreateTopic($input: CreateTopicInput!) {
        createTopic(input: $input) {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <CreateTopicMutation>response.data.createTopic;
  }
  async UpdateTopic(input: UpdateTopicInput): Promise<UpdateTopicMutation> {
    const statement = `mutation UpdateTopic($input: UpdateTopicInput!) {
        updateTopic(input: $input) {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <UpdateTopicMutation>response.data.updateTopic;
  }
  async DeleteTopic(input: DeleteTopicInput): Promise<DeleteTopicMutation> {
    const statement = `mutation DeleteTopic($input: DeleteTopicInput!) {
        deleteTopic(input: $input) {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <DeleteTopicMutation>response.data.deleteTopic;
  }
  async CreateCard(input: CreateCardInput): Promise<CreateCardMutation> {
    const statement = `mutation CreateCard($input: CreateCardInput!) {
        createCard(input: $input) {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <CreateCardMutation>response.data.createCard;
  }
  async UpdateCard(input: UpdateCardInput): Promise<UpdateCardMutation> {
    const statement = `mutation UpdateCard($input: UpdateCardInput!) {
        updateCard(input: $input) {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <UpdateCardMutation>response.data.updateCard;
  }
  async DeleteCard(input: DeleteCardInput): Promise<DeleteCardMutation> {
    const statement = `mutation DeleteCard($input: DeleteCardInput!) {
        deleteCard(input: $input) {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <DeleteCardMutation>response.data.deleteCard;
  }
  async GetTopic(id: string): Promise<GetTopicQuery> {
    const statement = `query GetTopic($id: ID!) {
        getTopic(id: $id) {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <GetTopicQuery>response.data.getTopic;
  }
  async ListTopics(filter?: ModelTopicFilterInput, limit?: number, nextToken?: string): Promise<ListTopicsQuery> {
    const statement = `query ListTopics($filter: ModelTopicFilterInput, $limit: Int, $nextToken: String) {
        listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          nextToken
        }
      }`;
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
    return <ListTopicsQuery>response.data.listTopics;
  }
  async GetCard(id: string): Promise<GetCardQuery> {
    const statement = `query GetCard($id: ID!) {
        getCard(id: $id) {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    return <GetCardQuery>response.data.getCard;
  }
  async ListCards(filter?: ModelCardFilterInput, limit?: number, nextToken?: string): Promise<ListCardsQuery> {
    const statement = `query ListCards($filter: ModelCardFilterInput, $limit: Int, $nextToken: String) {
        listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            front
            back
            topic {
              __typename
              id
              name
              user
            }
            lastStudy
            box
          }
          nextToken
        }
      }`;
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
    return <ListCardsQuery>response.data.listCards;
  }
  OnCreateTopicListener: Observable<OnCreateTopicSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateTopic {
        onCreateTopic {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnCreateTopicSubscription>;

  OnUpdateTopicListener: Observable<OnUpdateTopicSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTopic {
        onUpdateTopic {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnUpdateTopicSubscription>;

  OnDeleteTopicListener: Observable<OnDeleteTopicSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTopic {
        onDeleteTopic {
          __typename
          id
          name
          user
          cards {
            __typename
            items {
              __typename
              id
              front
              back
              lastStudy
              box
            }
            nextToken
          }
        }
      }`
    )
  ) as Observable<OnDeleteTopicSubscription>;

  OnCreateCardListener: Observable<OnCreateCardSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateCard {
        onCreateCard {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`
    )
  ) as Observable<OnCreateCardSubscription>;

  OnUpdateCardListener: Observable<OnUpdateCardSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCard {
        onUpdateCard {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`
    )
  ) as Observable<OnUpdateCardSubscription>;

  OnDeleteCardListener: Observable<OnDeleteCardSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCard {
        onDeleteCard {
          __typename
          id
          front
          back
          topic {
            __typename
            id
            name
            user
            cards {
              __typename
              nextToken
            }
          }
          lastStudy
          box
        }
      }`
    )
  ) as Observable<OnDeleteCardSubscription>;
}
