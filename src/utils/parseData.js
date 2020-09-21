import {isNotEmpty} from './checkIfObjNotEmpty';

export const parseData = (dateArg, obj) => {
  if(isNotEmpty(obj)) {
    const [data] = dateArg.split('.');
    const [date, time] = data.split('T');
    return `${date} ${time}`;
  }
};