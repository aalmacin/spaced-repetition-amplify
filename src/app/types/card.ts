import { Box } from '../API.service';

export type Card = {
  id: string;
  topicId: string;
  topicName: string;
  front: string;
  back: string;
  lastStudy: number;
  isReadyToStudy: boolean;
  lastStudyDate: string;
  nextStudyDate: string;
  box: Box;
};
