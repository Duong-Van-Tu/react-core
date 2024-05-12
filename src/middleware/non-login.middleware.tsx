import { Navigate } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: UserProfile;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  if (isFetchedProfile || !!user) {
    if (user) {
      return <Navigate to="/sales/kpi" />;
    }
  }

  return children;
}
