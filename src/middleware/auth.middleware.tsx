import PageIndicator from '@/components/page-indicator';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  user: UserProfile;
  isFetchedProfile: boolean;
}

export default function Auth({ children, user, isFetchedProfile }: AuthProps) {
  const navigate = useNavigate();
  const location = useLocation();
  if (!isFetchedProfile) {
    return <PageIndicator />;
  }

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }

    if (user && isFetchedProfile && location.pathname === '/') {
      navigate('/sales/kpi');
    }
  }, [user, isFetchedProfile]);

  return children;
}
