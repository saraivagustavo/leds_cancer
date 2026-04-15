import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <MedicalServicesIcon sx={{ mr: 1 }} onClick={() => { window.location.href = '/'; }} style={{ cursor: 'pointer' }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }} onClick={() => { window.location.href = '/'; }} style={{ cursor: 'pointer' }}>
            MyHealth
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/prescription">
            Nova Receita
          </Button>
          <Button color="inherit" component={Link} to="/my-prescriptions">
            Minhas Receitas
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
