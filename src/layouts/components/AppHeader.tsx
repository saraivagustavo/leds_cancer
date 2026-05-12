import { AppBar, Chip, Container, Toolbar } from '@mui/material'
import { type MouseEvent, type ReactElement, type ReactNode } from 'react'
import { BrandButton } from './BrandButton'
import { DesktopNavigation } from './DesktopNavigation'
import { ProfileMenuButton } from './ProfileMenuButton'

type NavigationItem = {
  icon: ReactNode
  label: string
  to: string
}

type AppHeaderProps = {
  currentPath: string
  initials?: string
  isDoctor: boolean
  isMenuOpen: boolean
  items: NavigationItem[]
  onBrandClick: () => void
  onMenuClick: (event: MouseEvent<HTMLElement>) => void
  profileColor: 'primary' | 'secondary'
  roleIcon: ReactElement
  roleLabel: string
}

/**
 * Cabeçalho fixo das telas autenticadas.
 *
 * Junta marca, navegação desktop, etiqueta de perfil e botão do menu. No mobile,
 * a navegação fica dentro do menu para caber sem sofrimento.
 */
export const AppHeader = ({
  currentPath,
  initials,
  isDoctor,
  isMenuOpen,
  items,
  onBrandClick,
  onMenuClick,
  profileColor,
  roleIcon,
  roleLabel,
}: AppHeaderProps) => (
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
        <BrandButton color={profileColor} onClick={onBrandClick} />

        <DesktopNavigation
          currentPath={currentPath}
          items={items}
          profileColor={profileColor}
        />

        <Chip
          icon={roleIcon}
          label={roleLabel}
          color={profileColor}
          variant="outlined"
          sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 700 }}
        />

        <ProfileMenuButton
          initials={initials}
          isDoctor={isDoctor}
          isMenuOpen={isMenuOpen}
          onClick={onMenuClick}
        />
      </Toolbar>
    </Container>
  </AppBar>
)
