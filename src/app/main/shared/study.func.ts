import { Box } from 'src/app/API.service';
import { addMinutes, addDays, getCurrentTimestamp } from './timestamp.func';

export const getNextStudyDate = (lastStudy: number, box: Box): number => {
  switch (box) {
    case Box.VERY_HARD:
      return addMinutes(lastStudy, 5);
    case Box.HARD:
      return addDays(lastStudy, 1);
    case Box.REGULAR:
      return addDays(lastStudy, 10);
    case Box.EASY:
      return addDays(lastStudy, 30);
    case Box.VERY_EASY:
      return addDays(lastStudy, 90);
    default:
      throw new Error('Invalid Box');
  }
};

export const isReadyToStudy = (lastStudyTimeStamp: number, box: Box): boolean =>
  getCurrentTimestamp() >= getNextStudyDate(lastStudyTimeStamp, box);

export const makeBoxEasier = (box: Box): Box => {
  switch (box) {
    case Box.VERY_EASY:
      return Box.VERY_EASY;
    case Box.EASY:
      return Box.VERY_EASY;
    case Box.REGULAR:
      return Box.EASY;
    case Box.HARD:
      return Box.REGULAR;
    case Box.VERY_HARD:
      return Box.HARD;
  }
};
