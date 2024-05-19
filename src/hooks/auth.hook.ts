import { useCallback } from 'react';
import { KEYS } from '@/constants/key';
import { useDispatch } from 'react-redux';
import { clearAuthDataAction, setDataAndTokenAction } from '@/redux/slicers/auth.slice';
import { useApi, useCaller } from './api.hook';
import { useQuery } from './query.hook';

export const useAuth = () => {
  const api = useApi('');
  const caller = useCaller();
  const dispatch = useDispatch();
  const { tenant } = useQuery();

  const clearData = useCallback(() => {
    localStorage.removeItem(KEYS.LOGIN_TOKEN_STORE_KEY);
    localStorage.removeItem(KEYS.TENANT_KEY);
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
        localStorage.setItem(KEYS.TENANT_KEY, tenant);
        dispatch(
          setDataAndTokenAction({
            token,
          }),
        );
      }
    },
    [api, caller],
  );

  const fetchProfile = useCallback(async () => {
    const res = await caller(() => api.post(`/ApplicationUsers/get-profile?tenant=${tenant}`), {
      loadingKey: 'profile-loading',
    });
    if (res?.succeeded) {
      dispatch(
        setDataAndTokenAction({
          user: res.data,
        }),
      );
    }
  }, [api, caller]);

  return { login, clearData, fetchProfile };
};
