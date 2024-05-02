import { Navigate } from 'react-router-dom';
import { PageIndicator } from '../components/page-indicator';

interface AuthProps {
  children: React.ReactElement;
  user: any;
  isFetchedProfile: boolean;
}

export default function Auth({ children, user, isFetchedProfile }: AuthProps) {
  if (!isFetchedProfile) {
    return <PageIndicator />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
