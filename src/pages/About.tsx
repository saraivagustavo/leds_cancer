import { Typography, Button } from '@mui/material'

/**
 * Página simples de exemplo.
 *
 * Ainda parece um espaço de teste do projeto, então a documentação deixa claro
 * que ela não faz parte do fluxo principal de receitas.
 */
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
