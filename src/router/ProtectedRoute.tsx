import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};
