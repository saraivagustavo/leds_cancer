import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <MedicalServicesIcon
            sx={{ mr: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            MyHealth
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {user?.role === 'doctor' && (
            <>
              <Button color="inherit" component={Link} to="/prescription">
                Nova Receita
              </Button>
              <Button color="inherit" component={Link} to="/doctor/prescriptions">
                Receitas Emitidas
              </Button>
            </>
          )}

          {user?.role === 'patient' && (
            <Button color="inherit" component={Link} to="/my-prescriptions">
              Minhas Receitas
            </Button>
          )}

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                {user.name}
              </Typography>
              <Button color="inherit" size="small" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Sair
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
