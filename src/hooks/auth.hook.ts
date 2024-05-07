import { useCallback } from 'react';
import { KEYS } from '@/constants/key';
import { useDispatch } from 'react-redux';
import {
  clearAuthDataAction,
  setDataAndTokenAction,
  setFetchProfileStatusAction,
} from '@/redux/slicers/auth.slice';
import { isEmail, isPhoneNumber } from '@/utils/validation';
import { useApi, useCaller } from './api.hook';
import { useRootSelector } from './selector.hook';

export const useAuth = () => {
  const api = useApi('/auth');
  const caller = useCaller();
  const dispatch = useDispatch();
  const token = useRootSelector((state) => state.auth.token);

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
    async (credential: string, password: string) => {
      let data;

      let loginField: string;
      if (isEmail(credential)) {
        loginField = 'email';
      } else if (isPhoneNumber(credential)) {
        loginField = 'telephone';
      } else {
        throw new Error('Invalid credential format');
      }

      data = await caller(() => api.post('/login', { [loginField]: credential, password }), {
        loadingKey: 'login-loading',
        messageKey: 'login-message',
      });

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
