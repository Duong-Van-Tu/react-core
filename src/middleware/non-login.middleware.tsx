import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: UserProfile;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  const navigate = useNavigate();

  // if (isFetchedProfile || !!user) {
  //   if (!!user && location.pathname.includes('/login')) {
  //     window.history.back();
  //     return null;
  //   }
  // }
  useEffect(() => {
    if (!user || !isFetchedProfile) {
      navigate('/login');
    } else {
      navigate('/sales/kpi');
    }
  }, [user, navigate]);

  return children;
}
