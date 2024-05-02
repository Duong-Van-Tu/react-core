import { isEmpty } from './common';

export function isNumberAble(value: any) {
  return typeof value === 'number' || (!isEmpty(value) && !isNaN(value) && !value.endsWith('.'));
}
