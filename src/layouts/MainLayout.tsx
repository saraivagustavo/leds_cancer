import { useMemo, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import LightModeIcon from '@mui/icons-material/LightMode'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LogoutIcon from '@mui/icons-material/Logout'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useColorMode } from '@/contexts/ColorModeContext'

export const MainLayout = () => {
  const { logout, user } = useAuth()
  const { mode, toggleMode } = useColorMode()
  const location = useLocation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isDoctor = user?.role === 'doctor'

  const navigationItems = useMemo(() => {
    if (isDoctor) {
      return [
        { icon: <HomeIcon fontSize="small" />, label: 'Home', to: '/dashboard' },
        { icon: <AddCircleOutlineIcon fontSize="small" />, label: 'Nova receita', to: '/prescription' },
        { icon: <DescriptionIcon fontSize="small" />, label: 'Receitas emitidas', to: '/doctor/prescriptions' },
      ]
    }

    return [
      { icon: <HomeIcon fontSize="small" />, label: 'Home', to: '/dashboard' },
      { icon: <DescriptionIcon fontSize="small" />, label: 'Minhas receitas', to: '/my-prescriptions' },
    ]
  }, [isDoctor])

  const roleLabel = isDoctor ? 'Médico' : 'Paciente'
  const roleIcon = isDoctor ? <LocalHospitalIcon fontSize="small" /> : <PersonIcon fontSize="small" />
  const profileColor = isDoctor ? 'primary' : 'secondary'
  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    navigate('/', { replace: true })
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, minHeight: 76 }}>
            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              onClick={() => navigate('/dashboard')}
              sx={{ cursor: 'pointer', minWidth: { xs: 'auto', md: 210 } }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  bgcolor: `${profileColor}.main`,
                  borderRadius: 2,
                  color: '#fff',
                  display: 'flex',
                  height: 42,
                  justifyContent: 'center',
                  width: 42,
                }}
              >
                <MedicalServicesIcon />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h6" fontWeight={900} lineHeight={1}>
                  MyHealth
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Receitas digitais
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={0.75} sx={{ flexGrow: 1, minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  overflowX: 'auto',
                }}
              >
                {navigationItems.map((item) => {
                  const active = location.pathname === item.to

                  return (
                    <Button
                      key={item.to}
                      component={RouterLink}
                      to={item.to}
                      startIcon={item.icon}
                      variant={active ? 'contained' : 'text'}
                      sx={{
                        borderRadius: 999,
                        bgcolor: active ? `${profileColor}.main` : 'transparent',
                        color: active ? '#fff' : 'text.secondary',
                        px: 2,
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          bgcolor: active ? `${profileColor}.dark` : 'action.hover',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </Stack>
            </Stack>

            <Chip
              icon={roleIcon}
              label={roleLabel}
              color={profileColor}
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 700 }}
            />

            <IconButton
              aria-controls={isMenuOpen ? 'profile-menu' : undefined}
              aria-expanded={isMenuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                gap: 1,
                px: 1,
              }}
            >
              <MenuIcon />
              <Avatar sx={{ bgcolor: isDoctor ? 'primary.dark' : 'secondary.dark', height: 30, width: 30 }}>
                {initials}
              </Avatar>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              mt: 1,
              width: 300,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: isDoctor ? 'primary.dark' : 'secondary.dark' }}>{initials}</Avatar>
            <Box>
              <Typography fontWeight={800}>{user?.name}</Typography>
              <Stack direction="row" spacing={0.75} alignItems="center" color="text.secondary">
                {roleIcon}
                <Typography variant="body2">{roleLabel}</Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {navigationItems.map((item) => (
          <MenuItem
            key={item.to}
            component={RouterLink}
            to={item.to}
            onClick={() => setAnchorEl(null)}
            selected={location.pathname === item.to}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.label}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={toggleMode}>
          <ListItemIcon>
            {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
          </ListItemIcon>
          {mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Outlet />
      </Container>
    </>
  )
}
