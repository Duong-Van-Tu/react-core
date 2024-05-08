import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: any;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isFetchedProfile || !!user) {
    if (!!user && location.pathname.includes('/login')) {
      window.history.back();
      return null;
    }
  }
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return children;
}
