import { Box } from './API.service';

export type Card = {
  id: string;
  topicId: string;
  front: string;
  back: string;
  lastStudy: number;
  box: Box;
};

export type CardViewModel = {
  id: string;
  topicId: string;
  topicName: string;
  front: string;
  back: string;
  lastStudy: number;
  isReadyToStudy: boolean;
  box: Box;
};
