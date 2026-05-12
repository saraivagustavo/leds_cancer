import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * Protege rotas que precisam de login e, opcionalmente, de um perfil específico.
 *
 * Se a pessoa não estiver logada ou não tiver o papel certo, mandamos de volta
 * para a entrada do app. Simples e previsível.
 */
export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
