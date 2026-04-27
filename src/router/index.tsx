import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { PrescriptionPage } from '../pages/createPrescription';
import { LoginPage } from '../pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { DoctorPrescriptionsPage, PatientPrescriptionsPage } from '../pages/getPrescriptions';

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
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
  ],
  {
    basename: '/my-health',
  }
);
