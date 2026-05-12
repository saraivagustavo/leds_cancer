import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { profileOptions } from '../data/profileOptions'

/**
 * Grade de escolha de perfil na entrada do app.
 *
 * Cada opção leva para o login correto, já deixando a rota carregar a
 * configuração visual e textual daquele perfil.
 */
export const ProfileOptionsGrid = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
      }}
    >
      {profileOptions.map((option) => (
        <Button
          key={option.role}
          onClick={() => navigate(`/login/${option.role}`)}
          sx={{
            minHeight: { xs: 260, md: 380 },
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            color: '#fff',
            background: option.gradient,
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&:hover': {
              filter: 'brightness(1.03)',
              transform: 'translateY(-3px)',
              boxShadow: '0 30px 70px rgba(15, 23, 42, 0.24)',
            },
          }}
        >
          {option.icon}
          <Typography variant="h4" component="span" fontWeight={800}>
            {option.label.toUpperCase()}
          </Typography>
          <Typography
            component="span"
            variant="body1"
            sx={{ maxWidth: 360, color: 'rgba(255, 255, 255, 0.86)' }}
          >
            {option.description}
          </Typography>
        </Button>
      ))}
    </Box>
  )
}
