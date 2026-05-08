import { useMemo, useState } from 'react'
import { Container } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useColorMode } from '@/contexts/ColorModeContext'
import { AppHeader } from './components/AppHeader'
import { ProfileMenu } from './components/ProfileMenu'
import {
  getInitials,
  getNavigationItems,
  getRoleIcon,
} from './utils/navigation'

export const MainLayout = () => {
  const { logout, user } = useAuth()
  const { mode, toggleMode } = useColorMode()
  const location = useLocation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isDoctor = user?.role === 'doctor'
  const navigationItems = useMemo(() => getNavigationItems(isDoctor), [isDoctor])
  const roleLabel = isDoctor ? 'Médico' : 'Paciente'
  const roleIcon = getRoleIcon(isDoctor)
  const profileColor = isDoctor ? 'primary' : 'secondary'
  const initials = getInitials(user)

  const closeMenu = () => setAnchorEl(null)

  const handleLogout = () => {
    closeMenu()
    logout()
    navigate('/', { replace: true })
  }

  return (
    <>
      <AppHeader
        currentPath={location.pathname}
        initials={initials}
        isDoctor={isDoctor}
        isMenuOpen={Boolean(anchorEl)}
        items={navigationItems}
        onBrandClick={() => navigate('/dashboard')}
        onMenuClick={(event) => setAnchorEl(event.currentTarget)}
        profileColor={profileColor}
        roleIcon={roleIcon}
        roleLabel={roleLabel}
      />

      <ProfileMenu
        anchorEl={anchorEl}
        currentPath={location.pathname}
        initials={initials}
        isDoctor={isDoctor}
        items={navigationItems}
        mode={mode}
        onClose={closeMenu}
        onLogout={handleLogout}
        onToggleMode={toggleMode}
        roleIcon={roleIcon}
        roleLabel={roleLabel}
        user={user}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>
    </>
  )
}
