import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/contexts/AuthContext';

// Mock credentials — substitua por integração real futuramente
const MOCK_USERS = [
  { username: 'dr.silva', password: '1234', name: 'Dr. Silva', role: 'doctor' as UserRole },
  { username: 'joao', password: '1234', name: 'João Paciente', role: 'patient' as UserRole },
];

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (!found) {
      setError('Usuário ou senha inválidos.');
      return;
    }
    login({ name: found.name, role: found.role });
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <MedicalServicesIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight={700}>
              MyHealth
            </Typography>
          </Box>

          <Typography variant="h6" mb={1}>
            Entrar
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Selecione seu perfil e faça login para continuar.
          </Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, val) => val && setRole(val)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="patient">
              <PersonIcon sx={{ mr: 1 }} fontSize="small" />
              Paciente
            </ToggleButton>
            <ToggleButton value="doctor">
              <LocalHospitalIcon sx={{ mr: 1 }} fontSize="small" />
              Médico
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Usuário"
            fullWidth
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Button variant="contained" fullWidth size="large" onClick={handleLogin}>
            Entrar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
