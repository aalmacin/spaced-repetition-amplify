import { Card } from '../card';
import { Box } from './Box';
import { addDays } from './timestamp.func';

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
