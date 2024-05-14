import { useCallback } from 'react';
import { KEYS } from '@/constants/key';
import { useDispatch } from 'react-redux';
import {
  clearAuthDataAction,
  setDataAndTokenAction,
  setFetchProfileStatusAction,
} from '@/redux/slicers/auth.slice';
import { useApi, useCaller } from './api.hook';
import { useRootSelector } from './selector.hook';
import { useQuery } from './query.hook';

export const useAuth = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const token = useRootSelector((state) => state.auth.token);
  const { tenant } = useQuery();

  const clearData = useCallback(() => {
    localStorage.removeItem(KEYS.LOGIN_TOKEN_STORE_KEY);
    dispatch(clearAuthDataAction());
  }, [dispatch]);

  const fetchProfile = useCallback(async () => {
    if (token) {
      const res: any = await caller(async () => api.get(''));
      if (res) {
        dispatch(
          setDataAndTokenAction({
            data: {
              id: res._id,
              email: res.email,
              role: res.role,
            },
          }),
        );
      } else {
        clearData();
      }
    }
    dispatch(setFetchProfileStatusAction(true));
  }, [token, api, dispatch, caller, clearData]);

  const login = useCallback(
    async (username: string, password: string) => {
      let data;

      data = await caller(
        () => api.post(`/Authentications/login?tenant=${tenant}`, { username, password }),
        {
          loadingKey: 'login-loading',
          messageKey: 'login-message',
        },
      );

      if (data) {
        const token = data.accessToken;
        localStorage.setItem(KEYS.LOGIN_TOKEN_STORE_KEY, token);
        dispatch(
          setDataAndTokenAction({
            token,
          }),
        );
        dispatch(setFetchProfileStatusAction(true));
      }

      return !!data;
    },
    [api, caller],
  );

  const logout = useCallback(async () => {
    await caller(() => api.post('/logout'), {
      loadingKey: 'logout',
    });

    clearData();
    dispatch(setFetchProfileStatusAction(false));
  }, [api, caller]);

  return { login, logout, clearData, fetchProfile };
};
