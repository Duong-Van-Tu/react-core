import { Navigate, useLocation } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: any;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (isFetchedProfile || !!user) {
    if (!!user && location.pathname.includes('/login')) {
      window.history.back();
      return null;
    }
  }
  return children;
}
