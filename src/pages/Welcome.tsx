import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PersonIcon from '@mui/icons-material/Person'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import VerifiedIcon from '@mui/icons-material/Verified'
import { Navigate, useNavigate } from 'react-router-dom'
import { ThemeModeButton } from '@/components/ThemeModeButton'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  {
    icon: <AssignmentIcon fontSize="large" color="primary" />,
    title: 'Receitas Digitais',
    description: 'Receitas médicas virtuais de forma rápida, organizada e sem papel.',
  },
  {
    icon: <VerifiedIcon fontSize="large" color="primary" />,
    title: 'Dados Validados',
    description: 'Todas as informações são validadas antes de serem salvas.',
  },
  {
    icon: <AccessTimeIcon fontSize="large" color="primary" />,
    title: 'Agilidade no Atendimento',
    description: 'Fluxo simples e intuitivo para médicos e pacientes.',
  },
]

const profileOptions = [
  {
    role: 'doctor',
    label: 'Entrar como médico',
    description: 'Prescreva novas receitas e acompanhe o histórico emitido.',
    icon: <LocalHospitalIcon sx={{ fontSize: 56 }} />,
    gradient: 'linear-gradient(135deg, #0f766e 0%, #2563eb 100%)',
  },
  {
    role: 'patient',
    label: 'Entrar como paciente',
    description: 'Consulte as receitas prescritas para você em um só lugar.',
    icon: <PersonIcon sx={{ fontSize: 56 }} />,
    gradient: 'linear-gradient(135deg, #be185d 0%, #7c3aed 100%)',
  },
] as const

export const WelcomePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        px: { xs: 2, md: 6 },
        py: 4,
      }}
    >
      <Box sx={{ position: 'absolute', right: 24, top: 24 }}>
        <ThemeModeButton />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1120 }}>
        <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <MedicalServicesIcon sx={{ fontSize: 52, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" fontWeight={800} color="primary.dark">
            MyHealth
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 680 }}>
            Bem-vindo ao sistema de receitas digitais. Escolha seu perfil para continuar.
          </Typography>
        </Stack>

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

        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, py: 5, px: 2, mt: 4 }}>
          <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
            Por que usar o MyHealth?
          </Typography>
          <Grid container spacing={3} justifyContent="center" maxWidth="md" mx="auto">
            {features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 4 }}>
                <Box textAlign="center" px={2}>
                  <Box mb={1}>{feature.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
