import { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Grid, Divider } from '@mui/material';
import { type IPrescription } from '@/contracts/Prescription';
import { usePrescription } from '@/modules/prescription/usePrescription';
import { MedicationList } from '@/components/Medications';

export const PrescriptionPage = () => {
  const { handleSave, loading } = usePrescription(); //isso aqui serve para chamar a função de salvar a receita e para controlar o estado de carregamento
  
  const [formData, setFormData] = useState<Partial<IPrescription>>({
    patientName: '',
    observations: '',
    medications: []
  }); //inicializa uma receita vazia, quando vai digitando os dados do paciente, o estado é atualizado

  const onSave = () => {
    handleSave(formData as IPrescription);
  }; //usa o handleSave para validar e salvar a receita, passando os dados do formulário como argumento

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
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Data"
              type="date"
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Medicamentos e Instruções</Typography>
        <MedicationList 
          medications={formData.medications || []} 
          onChange={(meds) => setFormData({ ...formData, medications: meds })}
        />

        <Divider sx={{ my: 3 }} />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Observações Gerais"
          value={formData.observations}
          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={onSave}
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Finalizar Receita'}
        </Button>
      </Box>
    </Box>
  );
};