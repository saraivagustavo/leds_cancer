import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/prescription">
            Nova Receita
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};