import PageIndicator from '@/components/page-indicator';
import { useQuery } from '@/hooks/query.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  logged: boolean;
}

export default function Auth({ children, logged }: AuthProps) {
  const { user } = useRootSelector((state) => state.auth);
  const { tenant } = useQuery();

  if (!logged) {
    return <Navigate to={`/auth/login?tenant=${tenant}`} />;
  }

  if (!user) {
    return <PageIndicator />;
  }
  return children;
}
