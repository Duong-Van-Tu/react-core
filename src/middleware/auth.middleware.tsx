import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: React.ReactElement;
  user: UserProfile;
}

export default function Auth({ children, user }: AuthProps) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
