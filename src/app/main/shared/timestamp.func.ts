import * as moment from 'moment-timezone';
import { DATE_FORMAT, TIMEZONE, DAY_SECONDS, MINUTE_SECONDS } from './constants';

export const getTimestampFromMoment = (m: any): number => {
  const tzDate = m.tz(TIMEZONE);
  const timestamp = tzDate.format('X');
  return parseInt(timestamp, 10);
};

export const getCurrentDate = (): string => moment.tz(TIMEZONE).format('LLL');

export const getTimestampFromDate = (date: string): number => getTimestampFromMoment(moment(date, DATE_FORMAT));

export const getCurrentTimestamp = (): number => getTimestampFromMoment(moment());

export const getDateFormat = (dateStr: string): string => moment(dateStr).format(DATE_FORMAT);

export const addDays = (timestamp: number, days: number): number => timestamp + days * DAY_SECONDS;
export const addMinutes = (timestamp: number, minutes: number): number => timestamp + minutes * MINUTE_SECONDS;

export const getDateFromTimestamp = (timestamp: number): string =>
  moment
    .unix(timestamp)
    .tz(TIMEZONE)
    .format('LLL');
