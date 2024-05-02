import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { undefinedRefine } from '../utils/common';

type Transformers<F = any> = [string, (value: string) => any, F?][];

export function useQuery<
  O = Record<string, string> & {
    getQueryStr: (...keypairs: [string, string | number][]) => string;
    push: typeof useNavigate;
  },
>(...transformers: Transformers) {
  const queryString = useLocation().search;
  const query = useMemo(() => {
    const [, queryStr] = queryString.split('?');
    if (queryStr) {
      const paramsStr = queryStr.split('&');
      return paramsStr.reduce((obj: Record<string, string | number>, str) => {
        const [key, value] = str.split('=');
        obj[key] = value || '';
        return obj;
      }, {});
    }
    return {};
  }, [queryString]);

  const queryParams = useMemo(() => {
    const _transformers = transformers.reduce(
      (
        obj: Record<
          Transformers[0][0],
          { parser: Transformers[0][1]; fallback: Transformers[0][2] }
        >,
        transformer,
      ) => {
        obj[transformer[0]] = {
          parser: transformer[1],
          fallback: transformer[2],
        };
        return obj;
      },
      {},
    );

    const combineKeys = Object.keys(_transformers).reduce(
      (keys: Record<string, any>, k) => {
        keys[k] = true;
        return keys;
      },
      { ...query },
    ); // force get key in transformer

    return Object.keys(combineKeys).reduce((params: Record<string, any>, k) => {
      if (_transformers[k]) {
        params[k] = _transformers[k].parser(query[k] as string);

        if (params[k] == null) {
          params[k] = _transformers[k].fallback;
        }
      } else {
        params[k] = query[k];
      }
      return params;
    }, {});
  }, [transformers, query]) as O;

  const getQueryStr = useCallback(
    (...keypairs: [string, string | number][]) => {
      const newParams: any = { ...queryParams };
      for (const [key, value] of keypairs) {
        newParams[key] = value;
      }
      const str = Object.keys(undefinedRefine(newParams))
        .map((key) => `${key}=${newParams[key]}`)
        .join('&');

      return str ? `?${str}` : str;
    },
    [queryParams],
  );

  return { ...queryParams, getQueryStr, push: useNavigate() };
}
