import { useQuery } from '@/hooks/query.hook';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  user: UserProfile;
  logged: boolean;
}

export default function Auth({ children, logged }: AuthProps) {
  const { tenant } = useQuery();
  if (!logged) {
    return <Navigate to={`/auth/login?tenant=${tenant}`} />;
  }

  return children;
}
