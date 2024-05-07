import { ReactElement, useMemo } from 'react';

import Auth from './auth.middleware';
import NonLogin from './non-login.middleware';

type MiddlewareProps = {
  children: ReactElement;
  fallback?: string;
  mode?: 'public' | 'private' | 'non-login';
};

export default function Middleware({ mode = 'public', children }: MiddlewareProps) {
  const isFetchedProfile = false;
  const user = null;

  //   useEffect(() => {
  //     fetchProfile();
  //   }, [fetchProfile]);

  const Gateway: any = useMemo(() => {
    if (mode === 'private') return Auth;
    if (mode === 'non-login') return NonLogin;
    return ({ children }: any) => children;
  }, [mode]);

  return (
    <Gateway user={user} isFetchedProfile={isFetchedProfile}>
      {children}
    </Gateway>
  );
}
