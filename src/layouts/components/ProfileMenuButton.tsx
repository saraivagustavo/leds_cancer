import { Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { type MouseEvent } from 'react'

type ProfileMenuButtonProps = {
  initials?: string
  isDoctor: boolean
  isMenuOpen: boolean
  onClick: (event: MouseEvent<HTMLElement>) => void
}

export const ProfileMenuButton = ({
  initials,
  isDoctor,
  isMenuOpen,
  onClick,
}: ProfileMenuButtonProps) => (
  <IconButton
    aria-controls={isMenuOpen ? 'profile-menu' : undefined}
    aria-expanded={isMenuOpen ? 'true' : undefined}
    aria-haspopup="true"
    onClick={onClick}
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
)
