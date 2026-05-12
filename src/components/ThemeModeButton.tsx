import { IconButton, Tooltip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useColorMode } from '@/contexts/ColorModeContext'

/**
 * Botão de alternância entre tema claro e escuro.
 *
 * Fica reaproveitável para aparecer tanto na entrada do app quanto em qualquer
 * ponto que precise desse controle.
 */
export const ThemeModeButton = () => {
  const { mode, toggleMode } = useColorMode()
  const isLight = mode === 'light'

  return (
    <Tooltip title={isLight ? 'Ativar modo escuro' : 'Ativar modo claro'}>
      <IconButton
        aria-label={isLight ? 'Ativar modo escuro' : 'Ativar modo claro'}
        onClick={toggleMode}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 10px 26px rgba(15, 23, 42, 0.10)',
        }}
      >
        {isLight ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  )
}
