import * as moment from 'moment-timezone';
import { DATE_FORMAT, TIMEZONE, DAY_SECONDS } from './constants';

export const getTimestampFromDate = (date: string) => {
  const m = moment(date, DATE_FORMAT);
  const tzDate = m.tz(TIMEZONE);
  const timestamp = tzDate.format('X');
  return parseInt(timestamp, 10);
};

export const addDays = (timestamp: number, days: number): number => timestamp + (days * DAY_SECONDS);
