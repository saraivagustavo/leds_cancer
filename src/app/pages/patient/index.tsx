import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InboxIcon from '@mui/icons-material/Inbox';
import { useState } from 'react';
import { type IPrescription } from '@/contracts/Prescription';
import { usePatientPrescriptions } from '@/modules/prescription/usePatientPrescriptions';

const formatDate = (date: string) => {
  if (!date) return '—';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

function PrescriptionDetail({
  prescription,
  onClose,
}: {
  prescription: IPrescription;
  onClose: () => void;
}) {
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <MedicationIcon color="primary" />
          Detalhes da Receita
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">Paciente</Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>{prescription.patientName}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <LocalHospitalIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">Médico</Typography>
            </Box>
            <Typography variant="body1" fontWeight={500}>
              {prescription.doctorName || '—'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">Data</Typography>
            </Box>
            <Typography variant="body1">{formatDate(prescription.date)}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Medicamentos
        </Typography>
        <List disablePadding>
          {prescription.medications.map((med) => (
            <Paper key={med.id} variant="outlined" sx={{ mb: 1, borderRadius: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight={600}>{med.name}</Typography>
                      <Chip label={med.dosage} size="small" color="primary" variant="outlined" />
                    </Box>
                  }
                  secondary={med.instructions}
                />
              </ListItem>
            </Paper>
          ))}
        </List>

        {prescription.observations && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Observações
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {prescription.observations}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2 }}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function PatientPage() {
  const { prescriptions } = usePatientPrescriptions();
  const [selected, setSelected] = useState<IPrescription | null>(null);

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Minhas Receitas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualize todas as receitas prescritas para você.
        </Typography>
      </Box>

      {prescriptions.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={10}
          gap={2}
          color="text.secondary"
        >
          <InboxIcon sx={{ fontSize: 64, opacity: 0.3 }} />
          <Typography variant="h6">Nenhuma receita encontrada</Typography>
          <Typography variant="body2">As receitas geradas pelo médico aparecerão aqui.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {prescriptions.map((prescription) => (
            <Grid key={prescription.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
                }}
              >
                <CardActionArea
                  onClick={() => setSelected(prescription)}
                  sx={{ height: '100%', p: 1 }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6" fontWeight={600} noWrap>
                        {prescription.patientName}
                      </Typography>
                      <Chip
                        label={`${prescription.medications.length} med.`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                      <LocalHospitalIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {prescription.doctorName || 'Médico não informado'}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(prescription.date)}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    <Typography variant="caption" color="text.secondary">
                      Medicamentos:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                      {prescription.medications.slice(0, 3).map((med) => (
                        <Chip key={med.id} label={med.name} size="small" />
                      ))}
                      {prescription.medications.length > 3 && (
                        <Chip
                          label={`+${prescription.medications.length - 3} mais`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selected && (
        <PrescriptionDetail prescription={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
}
