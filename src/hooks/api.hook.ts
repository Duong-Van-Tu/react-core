import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setMessageAction } from '../redux/slicers/api-message.slice';
import { setLoadingAction } from '../redux/slicers/loading.slice';
import { tick } from '../utils/common';
import { API } from '../utils/axios';
import { Messages } from '../constants/message';

export function useApi(basePath: string) {
  const axios = API;

  return useMemo(() => {
    return {
      get: (path: string, query: Record<string, any> = {}): any => {
        const url = path.startsWith('http') ? path : `${axios.defaults.baseURL}${basePath}${path}`;
        return axios.get(url, { params: query });
      },
      post: (path: string, body: Record<string, any> | FormData = {}): any => {
        const url = path.startsWith('http') ? path : `${axios.defaults.baseURL}${basePath}${path}`;
        return axios.post(url, body);
      },
      put: (path: string, body: Record<string, any> | FormData = {}): any =>
        axios.put(`${basePath}${path}`, body),
      del: (path: string, query: Record<string, any> = {}): any =>
        axios.delete(`${basePath}${path}`, { params: query }),
    };
  }, [basePath, axios]);
}

interface CallerOptions {
  messageKey?: string;
  loadingKey?: string;
  successMessage?: string;
  errorMessage?: string;
  delay?: number;
}

type Caller = <T = any>(
  func: () => Promise<T | null | undefined>,
  options?: CallerOptions,
) => Promise<T | null | undefined>;

export function useCaller() {
  const dispatch = useDispatch();

  const setMessage = useCallback(
    (key: string, info?: MessageOptions) => {
      dispatch(setMessageAction([key, info]));
    },
    [dispatch],
  );

  const setLoading = useCallback(
    (key: string, el?: boolean) => {
      dispatch(setLoadingAction([key, el]));
    },
    [dispatch],
  );

  const caller = useCallback<Caller>(
    async (
      func,
      {
        successMessage = '',
        errorMessage,
        messageKey = 'global',
        loadingKey = 'global',
        delay,
      } = {},
    ) => {
      messageKey && setMessage(messageKey);
      try {
        setLoading(loadingKey, true);

        const [res]: any = await Promise.all([func(), delay != null ? tick(delay) : undefined]);
        if (
          res === undefined ||
          (res &&
            (!!res.data?.error ||
              res.exception === 'Error' ||
              res.status >= 400 ||
              res.statusCode >= 400))
        ) {
          if (messageKey) {
            const messages: string[] = errorMessage
              ? [errorMessage]
              : [res.data?.error || Messages.API_ERROR];

            setMessage(messageKey, {
              type: 'error',
              messages: messages,
            });
          }
          setTimeout(() => setLoading(loadingKey, false), 0);
          return null;
        }
        if (successMessage !== '') {
          if (messageKey) {
            setMessage(messageKey, {
              type: 'success',
              messages: [successMessage],
            });
          }
        }
        setTimeout(() => setLoading(loadingKey, false), 0);
        return res?.data;
      } catch (error: any) {
        console.warn('Response', error?.response || error);
        if (messageKey) {
          const errors = error.response?.data?.message || error.response?.data?.error;
          setMessage(messageKey, {
            type: 'error',
            messages: errorMessage ? [errorMessage] : errors ? [errors] : [Messages.API_ERROR],
          });
        }
        setTimeout(() => setLoading(loadingKey, false), 0);
        return null;
      }
    },
    [setLoading, setMessage],
  );
  return caller;
}
