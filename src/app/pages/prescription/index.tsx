import { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import { type IPrescription } from '../../../contracts/Prescription';
import { usePrescription } from '../../../modules/prescription/usePrescription';
import { MedicationList } from '../../../components/MedicationsList';

export const PrescriptionPage = () => {
  const { handleSave, loading, errors, setErrors } = usePrescription();
  
  const [formData, setFormData] = useState<Partial<IPrescription>>({
    patientName: '',
    observations: '',
    medications: []
  });

  const getFieldError = (fieldName: string) => 
    errors.find(err => err.field === fieldName)?.message;

  const onSave = async () => {
    const success = await handleSave(formData as IPrescription);
    if (success) {
      setFormData({ patientName: '', observations: '', medications: [] });
    }
  };

  const updateField = (field: keyof IPrescription, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Gerar Receita Virtual</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Dados do Paciente</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Nome do Paciente"
              value={formData.patientName}
              onChange={(e) => updateField('patientName', e.target.value)}
              error={!!getFieldError('patientName')}
              helperText={getFieldError('patientName')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Data"
              type="date"
              slotProps={{inputLabel: { shrink: true }}}
              value={formData.date || ''}
              onChange={(e) => updateField('date', e.target.value)}
              error={!!getFieldError('date')}
              helperText={getFieldError('date')}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <MedicationList
          medications={formData.medications || []}
          onChange={(newMeds) => updateField('medications', newMeds)}
        />
        
        {getFieldError('medications') && (
          <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
            {getFieldError('medications')}
          </Typography>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          onClick={onSave}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Finalizar Receita'}
        </Button>
      </Box>
    </Box>
  );
};