import { Card } from './card';

export type Topic = {
  id: string;
  name: string;
  cardCount: number;
};

export interface TopicWithCards extends Topic {
  user: string;
  cards: Card[];
}
