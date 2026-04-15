import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import VerifiedIcon from '@mui/icons-material/Verified'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: <AssignmentIcon fontSize="large" color="primary" />,
    title: 'Receitas Digitais',
    description: 'Gere receitas médicas virtuais de forma rápida, organizada e sem papel.',
  },
  {
    icon: <VerifiedIcon fontSize="large" color="primary" />,
    title: 'Dados Validados',
    description: 'Todas as informações são validadas antes de serem salvas, garantindo integridade.',
  },
  {
    icon: <AccessTimeIcon fontSize="large" color="primary" />,
    title: 'Agilidade no Atendimento',
    description: 'Reduza o tempo de consulta com um fluxo simples e intuitivo de prescrição.',
  },
]

const profiles = [
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />,
    title: 'Sou Médico',
    description: 'Crie e gerencie receitas para seus pacientes com praticidade.',
    action: 'Gerar Receita',
    to: '/prescription',
    variant: 'contained' as const,
  },
  {
    icon: <PersonIcon sx={{ fontSize: 48 }} />,
    title: 'Sou Paciente',
    description: 'Visualize as receitas prescritas para você de qualquer lugar.',
    action: 'Ver Minhas Receitas',
    to: '/my-prescriptions',
    variant: 'outlined' as const,
  },
]

export function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: 2,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
          borderRadius: 3,
          mb: 6,
        }}
      >
        <MedicalServicesIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary.dark">
          MyHealth
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', mb: 4 }}>
          Plataforma de receitas médicas virtuais. Simples para o médico prescrever, fácil para o paciente acompanhar.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/prescription"
          startIcon={<AssignmentIcon />}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Gerar Receita Agora
        </Button>
      </Box>

      {/* Perfis */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          Como você quer acessar?
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          A plataforma se adapta ao seu perfil.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {profiles.map((profile) => (
            <Grid key={profile.title} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box color="primary.main">{profile.icon}</Box>
                <Typography variant="h6" fontWeight={600}>{profile.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {profile.description}
                </Typography>
                <Button
                  variant={profile.variant}
                  component={Link}
                  to={profile.to}
                  sx={{ borderRadius: 3, mt: 1 }}
                >
                  {profile.action}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features */}
      <Box sx={{ bgcolor: 'grey.50', borderRadius: 3, py: 6, px: 2, mb: 4 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
          Por que usar o MyHealth?
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Tudo que você precisa em um só lugar.
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
  )
}
