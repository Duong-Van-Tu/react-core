import { Navigate } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  user: any;
  isFetchedProfile: boolean;
}

export default function NonLogin({ user, isFetchedProfile, children }: NonLoginProps) {
  if (isFetchedProfile || !!user) {
    // Logged user can't access current page, have to redirect to home
    if (user) {
      return <Navigate to="/" />;
    }
  }
  return children;
}
