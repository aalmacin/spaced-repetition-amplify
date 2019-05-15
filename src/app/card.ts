import { Box } from './study/Box';

export type Card = {
  id: number,
  topicId: number,
  front: string,
  back: string,
  lastStudy: number,
  box: Box
}
