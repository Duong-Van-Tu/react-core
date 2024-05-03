import { isEmpty } from '../utils/common';
import { isNumberAble } from '../utils/number';

export const Transformers = {
  Noop: (data: any) => data,
  Integer: function (value: string[] | string | undefined | null) {
    let _value = value;
    if (typeof _value === 'string') {
      _value = _value.split(/[^0-9]/).join('');
    }
    const num = Transformers.Number(_value as string);
    return isEmpty(num) ? undefined : Math.floor(num!);
  },
  Number: function (value: string[] | string | undefined | null, keep = false) {
    return (isNumberAble(value) ? Number(value) : keep ? value : undefined) as number | undefined;
  },
  CSSValue: function (value: string | number | undefined | null) {
    return value === '' || value == null
      ? undefined
      : typeof value === 'string'
      ? value
      : `${value}px`;
  },
  UrlDecode: function (value: string[] | string | undefined | null) {
    let _value;
    if (Array.isArray(value)) {
      _value = value[0];
    } else {
      _value = value;
    }

    return decodeURIComponent(_value || '');
  },
  Boolean: function (value: string | number) {
    return !value || value === '0' || value === 'false' ? false : true;
  },
};
