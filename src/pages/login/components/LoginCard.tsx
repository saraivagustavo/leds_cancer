import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import { type UserRole } from '@/contexts/AuthContext'
import { roleConfig } from '../data/roleConfig'

type LoginCardProps = {
  error: string
  onBack: () => void
  onLogin: () => void
  password: string
  role: UserRole
  setError: (error: string) => void
  setPassword: (password: string) => void
  setUsername: (username: string) => void
  username: string
}

export const LoginCard = ({
  error,
  onBack,
  onLogin,
  password,
  role,
  setError,
  setPassword,
  setUsername,
  username,
}: LoginCardProps) => {
  const config = roleConfig[role]

  return (
    <Card sx={{ maxWidth: 440, width: '100%', borderRadius: 2, boxShadow: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ mb: 2, px: 0 }}
        >
          Voltar
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: `${config.accent}14`,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {config.icon}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              MyHealth
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role === 'doctor' ? 'Área médica' : 'Área do paciente'}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" fontWeight={700} mb={1}>
          {config.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {config.subtitle}
        </Typography>

        <TextField
          label="Usuário"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
            setError('')
          }}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError('')
          }}
          onKeyDown={(event) => event.key === 'Enter' && onLogin()}
        />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          {config.helper}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onLogin}
          startIcon={<MedicalServicesIcon />}
          sx={{ bgcolor: config.accent, '&:hover': { bgcolor: config.accent } }}
        >
          Entrar
        </Button>
      </CardContent>
    </Card>
  )
}
