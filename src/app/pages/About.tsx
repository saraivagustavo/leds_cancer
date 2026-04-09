import { Typography, Button } from '@mui/material'

export function About() {
  return (
        <>
          <Typography variant="h4">About Page blablablabla</Typography>

          <Button 
          variant="contained" 
          color="primary" 
          onClick={ () => alert('clicou no botão!') }
          >
            clica em mim ai
      </Button>
    </>
  )
}
