import { Box } from './study/Box';
import { isReadyToStudy } from './study/study.func';

export type Card = {
  id: number,
  topicId: number,
  front: string,
  back: string,
  lastStudy: number,
  box: Box
}

export type CardViewModel = {
  id: number,
  topicId: number,
  front: string,
  back: string,
  lastStudy: number,
  isReadyToStudy: boolean,
  box: Box
}
