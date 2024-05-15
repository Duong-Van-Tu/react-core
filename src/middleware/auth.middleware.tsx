import PageIndicator from '@/components/page-indicator';
import { useQuery } from '@/hooks/query.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  logged: boolean;
}

export default function Auth({ children, logged }: AuthProps) {
  const { user } = useRootSelector((state) => state.auth);
  const { tenant } = useQuery();
  const { pathname } = useLocation();

  if (!logged) {
    return <Navigate to={`/auth/login?tenant=${tenant}`} />;
  }

  if (!user) {
    return <PageIndicator />;
  }

  if (pathname === '/') {
    return <Navigate to={`/sales/kpi?tenant=${tenant}`} />;
  }
  return children;
}
