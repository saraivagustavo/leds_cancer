import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light', // pode trocar pra 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})