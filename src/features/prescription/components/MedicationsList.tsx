import { Box, Button, TextField, Typography, IconButton, Paper, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { type IMedication } from '@/features/prescription/types';

interface MedicationListProps {
  medications: IMedication[];
  onChange: (medications: IMedication[]) => void;
}

export const MedicationList = ({ medications, onChange }: MedicationListProps) => {
  
  const addMedication = () => {
    const newMedication: IMedication = {
      id: crypto.randomUUID(),
      name: '',
      dosage: '',
      instructions: ''
    };
    onChange([...medications, newMedication]);
  };

  const removeMedication = (id: string) => {
    onChange(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, field: keyof IMedication, value: string) => {
    onChange(medications.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Medicamentos</Typography>
        <Button startIcon={<AddIcon />} variant="outlined" onClick={addMedication}>
          Adicionar Remédio
        </Button>
      </Box>

      {medications.map((med) => (
        <Paper key={med.id} variant="outlined" sx={{ p: 2, mb: 2, position: 'relative' }}>
          <IconButton 
            onClick={() => removeMedication(med.id)}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
            color="error"
            aria-label='remover medicamento'
          >
            <DeleteIcon />
          </IconButton>
          
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Nome do Medicamento" 
                value={med.name}
                onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField 
                fullWidth 
                label="Dosagem (ex: 500mg)" 
                value={med.dosage}
                onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField 
                fullWidth 
                label="Instruções de uso" 
                multiline 
                rows={2} 
                value={med.instructions}
                onChange={(e) => updateMedication(med.id, 'instructions', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};
