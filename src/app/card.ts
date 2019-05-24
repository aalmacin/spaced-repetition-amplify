import { Box } from './study/Box';

export type Card = {
  id: number;
  topicId: number;
  front: string;
  back: string;
  lastStudy: number;
  box: Box;
};

export type CardViewModel = {
  id: number;
  topicId: number;
  topicName: string;
  front: string;
  back: string;
  lastStudy: number;
  isReadyToStudy: boolean;
  box: Box;
};
