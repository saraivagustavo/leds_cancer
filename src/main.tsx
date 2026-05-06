import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'
import { AuthProvider } from '@/contexts/AuthContext'
import { AppThemeProvider } from '@/contexts/ColorModeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  </React.StrictMode>
)
