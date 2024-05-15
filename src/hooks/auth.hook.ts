import { useCallback } from 'react';
import { KEYS } from '@/constants/key';
import { useDispatch } from 'react-redux';
import { clearAuthDataAction, setDataAndTokenAction } from '@/redux/slicers/auth.slice';
import { useApi, useCaller } from './api.hook';
import { useRootSelector } from './selector.hook';
import { useQuery } from './query.hook';

export const useAuth = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const token = useRootSelector((state) => state.auth.token);
  const { tenant } = useQuery();

  const logged = !!token;

  const clearData = useCallback(() => {
    localStorage.removeItem(KEYS.LOGIN_TOKEN_STORE_KEY);
    dispatch(clearAuthDataAction());
  }, [dispatch]);

  const login = useCallback(
    async (username: string, password: string) => {
      const { data, succeeded } = await caller(
        () => api.post(`/Authentications/login?tenant=${tenant}`, { username, password }),
        {
          loadingKey: 'login-loading',
          messageKey: 'login-message',
        },
      );

      if (succeeded) {
        const token = data.token;
        localStorage.setItem(KEYS.LOGIN_TOKEN_STORE_KEY, token);
        dispatch(
          setDataAndTokenAction({
            token,
          }),
        );
      }
    },
    [api, caller],
  );

  return { login, clearData, logged };
};
