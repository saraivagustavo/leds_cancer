import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import { type ReactElement, type ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { type AuthUser } from '@/contexts/AuthContext'

type NavigationItem = {
  icon: ReactNode
  label: string
  to: string
}

type ProfileMenuProps = {
  anchorEl: HTMLElement | null
  currentPath: string
  initials?: string
  isDoctor: boolean
  items: NavigationItem[]
  mode: 'light' | 'dark'
  onClose: () => void
  onLogout: () => void
  onToggleMode: () => void
  roleIcon: ReactElement
  roleLabel: string
  user: AuthUser | null
}

export const ProfileMenu = ({
  anchorEl,
  currentPath,
  initials,
  isDoctor,
  items,
  mode,
  onClose,
  onLogout,
  onToggleMode,
  roleIcon,
  roleLabel,
  user,
}: ProfileMenuProps) => (
  <Menu
    id="profile-menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
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

    {items.map((item) => (
      <MenuItem
        key={item.to}
        component={RouterLink}
        to={item.to}
        onClick={onClose}
        selected={currentPath === item.to}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        {item.label}
      </MenuItem>
    ))}

    <Divider />

    <MenuItem onClick={onToggleMode}>
      <ListItemIcon>
        {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
      </ListItemIcon>
      {mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    </MenuItem>

    <MenuItem onClick={onLogout}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      Sair
    </MenuItem>
  </Menu>
)
