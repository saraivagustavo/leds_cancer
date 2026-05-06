import { createTheme, type PaletteMode } from '@mui/material/styles'

const getDesignTokens = (mode: PaletteMode) => {
  const isDark = mode === 'dark'

  return {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            textTransform: 'none' as const,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
    palette: {
      background: {
        default: isDark ? '#0f172a' : '#f6f8fb',
        paper: isDark ? '#172033' : '#ffffff',
      },
      divider: isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(15, 23, 42, 0.10)',
      mode,
      primary: {
        contrastText: '#ffffff',
        dark: '#0f766e',
        light: '#5eead4',
        main: '#0d9488',
      },
      secondary: {
        contrastText: '#ffffff',
        dark: '#be185d',
        light: '#f9a8d4',
        main: '#db2777',
      },
      text: {
        disabled: isDark ? '#64748b' : '#94a3b8',
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#cbd5e1' : '#64748b',
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: "Inter, Roboto, system-ui, 'Segoe UI', sans-serif",
      h3: {
        letterSpacing: 0,
      },
      h4: {
        letterSpacing: 0,
      },
    },
  }
}

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode))
