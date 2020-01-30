import { Card } from './card';

export type Topic = {
  id: string;
  name: string;
};

export interface TopicWithCards extends Topic {
  user: string;
  cards: Card[];
}
