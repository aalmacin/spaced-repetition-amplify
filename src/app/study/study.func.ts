import { Card } from '../card';
import { Box } from './Box';
import { addDays } from './timestamp.func';

export const getNextStudyDate = (card: Card): number => {
  switch(card.box) {
    case Box.VERY_HARD:
      return addDays(card.lastStudy, 1);
    case Box.HARD:
      return addDays(card.lastStudy, 10);
  }
};
