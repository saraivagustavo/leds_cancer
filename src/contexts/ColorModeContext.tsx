import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { type PaletteMode } from '@mui/material/styles'
import { createAppTheme } from '@/themes/themes'

interface ColorModeContextType {
  mode: PaletteMode
  toggleMode: () => void
}

const STORAGE_KEY = 'myhealth:theme-mode'
const ColorModeContext = createContext<ColorModeContextType | null>(null)

const getInitialMode = (): PaletteMode => {
  const storedMode = localStorage.getItem(STORAGE_KEY)

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode)

  const theme = useMemo(() => createAppTheme(mode), [mode])

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => {
          const nextMode = currentMode === 'light' ? 'dark' : 'light'
          localStorage.setItem(STORAGE_KEY, nextMode)
          return nextMode
        })
      },
    }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export const useColorMode = () => {
  const context = useContext(ColorModeContext)

  if (!context) {
    throw new Error('useColorMode must be used within AppThemeProvider')
  }

  return context
}
