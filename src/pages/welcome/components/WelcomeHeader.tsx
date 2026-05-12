import { Stack, Typography } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'

/**
 * Cabeçalho da tela inicial.
 *
 * Apresenta a marca antes da pessoa escolher se vai entrar como médico ou
 * paciente.
 */
export const WelcomeHeader = () => (
  <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
    <MedicalServicesIcon sx={{ fontSize: 52, color: 'primary.main' }} />
    <Typography variant="h3" component="h1" fontWeight={800} color="primary.dark">
      MyHealth
    </Typography>
    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 680 }}>
      Bem-vindo ao sistema de receitas digitais. Escolha seu perfil para continuar.
    </Typography>
  </Stack>
)
