import PageIndicator from '@/components/page-indicator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  user: UserProfile;
  isFetchedProfile: boolean;
}

export default function Auth({ children, user, isFetchedProfile }: AuthProps) {
  const navigate = useNavigate();
  if (!isFetchedProfile) {
    return <PageIndicator />;
  }

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);

  return children;
}
