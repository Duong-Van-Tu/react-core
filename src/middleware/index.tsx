import { ReactElement, useEffect, useMemo } from 'react';

import Auth from './auth.middleware';
import NonLogin from './non-login.middleware';
import { useAuth } from '@/hooks/auth.hook';
import { useRootSelector } from '@/hooks/selector.hook';

type MiddlewareProps = {
  children: ReactElement;
  fallback?: string;
  mode?: 'public' | 'private' | 'non-login';
};

export default function Middleware({ mode = 'public', children }: MiddlewareProps) {
  const { fetchProfile } = useAuth();
  const token = useRootSelector((state) => state.auth.token);
  const tenant = useRootSelector((state) => state.auth.tenant);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [fetchProfile, token]);

  useEffect(() => {
    if (tenant) {
      const searchParams = new URLSearchParams(window.location.search);
      const currentTenant = searchParams.get('tenant');

      if (currentTenant !== tenant) {
        searchParams.set('tenant', tenant);
        window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
      }
    }
  }, [tenant]);

  const Gateway: any = useMemo(() => {
    if (mode === 'private') return Auth;
    if (mode === 'non-login') return NonLogin;
    return ({ children }: any) => children;
  }, [mode]);

  return <Gateway logged={!!token}>{children}</Gateway>;
}
