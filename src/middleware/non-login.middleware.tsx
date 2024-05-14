import { useQuery } from '@/hooks/query.hook';
import { Navigate } from 'react-router-dom';

interface NonLoginProps {
  children: React.ReactElement;
  logged: boolean;
}

export default function NonLogin({ logged, children }: NonLoginProps) {
  const { tenant } = useQuery();
  if (logged) {
    return <Navigate to={`/sales/kpi?tenant=${tenant}`} />;
  }
  return children;
}
