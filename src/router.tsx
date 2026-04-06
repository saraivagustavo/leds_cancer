import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import { Home } from '@/app/pages/Home'
import { About } from '@/app/pages/About'
import { PrescriptionPage } from './app/pages/prescription'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
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
          element: <PrescriptionPage />,
        },
      ],
    },
  ],
  {
    basename: '/my-health',
  }
)