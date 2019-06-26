import * as moment from 'moment-timezone';
import { DATE_FORMAT, TIMEZONE, DAY_SECONDS } from './constants';

export const getTimestampFromMoment = (m: any): number => {
  const tzDate = m.tz(TIMEZONE);
  const timestamp = tzDate.format('X');
  return parseInt(timestamp, 10);
};

export const getTimestampFromDate = (date: string): number => getTimestampFromMoment(moment(date, DATE_FORMAT));

export const getCurrentTimestamp = (): number => getTimestampFromMoment(moment());

export const addDays = (timestamp: number, days: number): number => timestamp + days * DAY_SECONDS;

export const getDateFromTimestamp = (timestamp: number) => moment.unix(timestamp).tz(TIMEZONE).format('LLL');
