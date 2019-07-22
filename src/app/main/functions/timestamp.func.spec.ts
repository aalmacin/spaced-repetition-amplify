import * as moment from 'moment-timezone';
import { getTimestampFromDate, addDays, getCurrentTimestamp } from './timestamp.func';

describe('Timestamp Func', () => {
  describe('getTimestampFromDate', () => {
    it('returns correct timestamp', () => {
      const actual = getTimestampFromDate('05-14-2019');

      // May 14, 2019 12:00am
      const expected = 1557806400;

      expect(actual).toEqual(expected);
    });
  });

  describe('getCurrentTimestamp', () => {
    it('returns correct current timestamp - greater than May 14, 2019', () => {
      const actual = getCurrentTimestamp();

      // May 14, 2019 12:00am
      const expected = 1557806400;

      expect(actual).toBeGreaterThan(expected);
    });

    it('returns correct current timestamp - lower than 2089', () => {
      const actual = getCurrentTimestamp();
      const expected = 3782437200;

      expect(actual).toBeLessThan(expected);
    });
  });

  describe('addDays', () => {
    it('returns correct day when 1 is sent', () => {
      // 5-14-2019
      const mockTimestamp = 1557806400;
      const mockDays = 1;

      const actual = addDays(mockTimestamp, mockDays);

      const expected = 1557892800;

      expect(actual).toEqual(expected);
    });

    it('returns correct day when 10 is sent', () => {
      // 5-24-2019
      const mockTimestamp = 1557806400;
      const mockDays = 10;

      const actual = addDays(mockTimestamp, mockDays);

      const expected = 1558670400;

      expect(actual).toEqual(expected);
    });
  });
});
