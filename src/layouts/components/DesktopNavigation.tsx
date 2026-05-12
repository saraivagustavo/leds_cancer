import { Button, Stack } from '@mui/material'
import { type ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type NavigationItem = {
  icon: ReactNode
  label: string
  to: string
}

type DesktopNavigationProps = {
  currentPath: string
  items: NavigationItem[]
  profileColor: 'primary' | 'secondary'
}

/**
 * Navegação principal para telas médias e grandes.
 *
 * No celular ela some para o menu de perfil assumir, evitando uma barra cheia
 * de botões espremidos.
 */
export const DesktopNavigation = ({
  currentPath,
  items,
  profileColor,
}: DesktopNavigationProps) => (
  <Stack spacing={0.75} sx={{ flexGrow: 1, minWidth: 0 }}>
    <Stack
      direction="row"
      spacing={1}
      sx={{
        display: { xs: 'none', md: 'flex' },
        overflowX: 'auto',
      }}
    >
      {items.map((item) => {
        const active = currentPath === item.to

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
)
