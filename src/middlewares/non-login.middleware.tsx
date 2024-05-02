import { useLocation } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: any;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  const location = useLocation();
  if (isFetchedProfile || !!user) {
    if (user && location.pathname.includes('/login')) {
      window.history.back();
      return null;
    }
  }
  return children;
}
