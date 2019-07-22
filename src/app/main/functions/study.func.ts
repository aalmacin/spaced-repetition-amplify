import { Card } from '@spaced-repetition/amplify/card';
import { Box } from 'src/app/API.service';
import { addDays, getCurrentTimestamp } from './timestamp.func';

export const getNextStudyDate = (card: Card): number => {
  switch (card.box) {
    case Box.VERY_HARD:
      return addDays(card.lastStudy, 1);
    case Box.HARD:
      return addDays(card.lastStudy, 10);
    case Box.REGULAR:
      return addDays(card.lastStudy, 30);
    case Box.EASY:
      return addDays(card.lastStudy, 90);
    case Box.VERY_EASY:
      return addDays(card.lastStudy, 180);
    default:
      throw new Error('Invalid Box');
  }
};

export const isReadyToStudy = (card: Card): boolean => getCurrentTimestamp() >= getNextStudyDate(card);

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
