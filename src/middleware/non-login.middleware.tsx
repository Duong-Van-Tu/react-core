import { useQuery } from '@/hooks/query.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface NonLoginProps {
  children: ReactElement;
}

export default function NonLogin({ children }: NonLoginProps) {
  const { tenant } = useQuery();
  const { user } = useRootSelector((state) => state.auth);
  if (user) {
    return <Navigate to={`/sales/kpi?tenant=${tenant}`} />;
  }
  return children;
}
