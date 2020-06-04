import moment from 'moment';

import { KibaException } from '../model';

const JSON_DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss.SSSZ';

export const dateFromString = (dateString: string, format: string = JSON_DATE_FORMAT): Date => {
  const parsedDate = moment.utc(dateString).format(format);
  if (parsedDate === 'Invalid date') {
    throw new KibaException(`Invalid date string ${dateString} passed to dateFromString method`);
  }
  return new Date(parsedDate);
};

export const dateToString = (date: Date, format: string = JSON_DATE_FORMAT, convertToLocal: boolean = true): string => {
  let momentDate = moment.utc(date);
  if (convertToLocal) {
    momentDate = momentDate.local();
  }
  const formattedDate = momentDate.format(format);
  if (formattedDate === 'Invalid date') {
    throw new KibaException(`Invalid date ${date} passed to datetimeToString method`);
  }
  return formattedDate;
};
