import { Box, Grid, Typography } from '@mui/material'
import { features } from '../data/features'

export const FeaturesSection = () => (
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
)
