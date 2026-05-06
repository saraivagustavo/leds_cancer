import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '@/App';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { PrescriptionPage } from '../pages/createPrescription';
import { LoginPage } from '../pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { DoctorPrescriptionsPage, PatientPrescriptionsPage } from '../pages/getPrescriptions';
import { WelcomePage } from '@/pages/Welcome';

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <Navigate to="/" replace />,
    },
    {
      path: '/login/:role',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <WelcomePage />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'prescription',
          element: (
            <ProtectedRoute allowedRoles={['doctor']}>
              <PrescriptionPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'doctor/prescriptions',
          element: (
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPrescriptionsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'my-prescriptions',
          element: (
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientPrescriptionsPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/prescription',
      element: (
        <ProtectedRoute allowedRoles={['doctor']}>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <PrescriptionPage />,
        },
      ],
    },
    {
      path: '/doctor/prescriptions',
      element: (
        <ProtectedRoute allowedRoles={['doctor']}>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DoctorPrescriptionsPage />,
        },
      ],
    },
    {
      path: '/my-prescriptions',
      element: (
        <ProtectedRoute allowedRoles={['patient']}>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <PatientPrescriptionsPage />,
        },
      ],
    },
  ],
  {
    basename: '/my-health',
  }
);
