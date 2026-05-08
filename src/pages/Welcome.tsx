import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { ThemeModeButton } from '@/components/ThemeModeButton'
import { useAuth } from '@/contexts/AuthContext'
import { FeaturesSection } from './welcome/components/FeaturesSection'
import { ProfileOptionsGrid } from './welcome/components/ProfileOptionsGrid'
import { WelcomeHeader } from './welcome/components/WelcomeHeader'

export const WelcomePage = () => {
  const { user } = useAuth()

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      <Box sx={{ position: 'absolute', right: 24, top: 24 }}>
        <ThemeModeButton />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1120 }}>
        <WelcomeHeader />
        <ProfileOptionsGrid />
        <FeaturesSection />
      </Box>
    </Box>
  )
}
