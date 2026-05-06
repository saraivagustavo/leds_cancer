import { useState, type ReactNode } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonIcon from '@mui/icons-material/Person'
import SaveIcon from '@mui/icons-material/Save'
import { useAuth } from '@/contexts/AuthContext'
import { MedicationList } from '@/features/prescription/components/MedicationsList'
import { usePrescription } from '@/features/prescription/hooks/usePrescription'
import { type IPrescription } from '@/features/prescription/types'

const steps = [
  { icon: <LocalHospitalIcon fontSize="small" />, label: 'Médico' },
  { icon: <PersonIcon fontSize="small" />, label: 'Paciente' },
  { icon: <MedicationIcon fontSize="small" />, label: 'Medicações' },
  { icon: <AssignmentTurnedInIcon fontSize="small" />, label: 'Revisão' },
]

const createInitialFormData = (doctorName = ''): Partial<IPrescription> => ({
  date: '',
  doctorName,
  medications: [],
  observations: '',
  patientName: '',
})

const SectionHeader = ({
  description,
  icon,
  title,
}: {
  description: string
  icon: ReactNode
  title: string
}) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2.5 }}>
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(20, 184, 166, 0.12)' : '#e3f2fd',
        borderRadius: 2,
        color: 'primary.main',
        display: 'flex',
        height: 44,
        justifyContent: 'center',
        width: 44,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Stack>
)

export const PrescriptionPage = () => {
  const { user } = useAuth()
  const { errors, handleSave, loading, setErrors } = usePrescription()

  const [formData, setFormData] = useState<Partial<IPrescription>>(
    createInitialFormData(user?.name)
  )
  const [saved, setSaved] = useState(false)

  const getFieldError = (fieldName: string) =>
    errors.find((error) => error.field === fieldName)?.message

  const onSave = async () => {
    const success = await handleSave(formData as IPrescription)

    if (success) {
      setFormData(createInitialFormData(user?.name))
      setSaved(true)
    }
  }

  const updateField = (field: keyof IPrescription, value: IPrescription[keyof IPrescription]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaved(false)

    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <Box sx={{ maxWidth: 980, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Gerar receita virtual
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Preencha as informações na ordem do atendimento para emitir uma receita completa.
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ borderRadius: 2, mb: 3, p: 2 }}>
        <Grid container spacing={1.5}>
          {steps.map((step, index) => (
            <Grid key={step.label} size={{ xs: 6, md: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={index + 1} color="primary" size="small" />
                <Box sx={{ color: 'primary.main', display: 'flex' }}>{step.icon}</Box>
                <Typography variant="body2" fontWeight={700}>
                  {step.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Receita salva com sucesso.
        </Alert>
      )}

      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
          <SectionHeader
            description="Identifique o profissional responsável pela prescrição."
            icon={<LocalHospitalIcon />}
            title="1. Informações do médico"
          />
          <TextField
            disabled
            error={Boolean(getFieldError('doctorName'))}
            fullWidth
            helperText={getFieldError('doctorName') || 'Preenchido automaticamente pelo login.'}
            label="Nome do médico"
            onChange={(event) => updateField('doctorName', event.target.value)}
            value={formData.doctorName}
          />
        </Paper>

        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
          <SectionHeader
            description="Informe para quem a receita será emitida e a data do atendimento."
            icon={<PersonIcon />}
            title="2. Informações do paciente"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                error={Boolean(getFieldError('patientName'))}
                fullWidth
                helperText={getFieldError('patientName')}
                label="Nome do paciente"
                onChange={(event) => updateField('patientName', event.target.value)}
                value={formData.patientName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                error={Boolean(getFieldError('date'))}
                fullWidth
                helperText={getFieldError('date')}
                label="Data"
                onChange={(event) => updateField('date', event.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                type="date"
                value={formData.date || ''}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
          <SectionHeader
            description="Adicione um ou mais medicamentos com dosagem e instruções de uso."
            icon={<MedicationIcon />}
            title="3. Medicações"
          />
          <MedicationList
            medications={formData.medications || []}
            onChange={(newMeds) => updateField('medications', newMeds)}
          />

          {getFieldError('medications') && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
              {getFieldError('medications')}
            </Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3 }}>
          <SectionHeader
            description="Revise os dados e registre observações complementares antes de finalizar."
            icon={<AssignmentTurnedInIcon />}
            title="4. Revisão e observações"
          />
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Médico
              </Typography>
              <Typography fontWeight={700}>{formData.doctorName || 'Não informado'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Paciente
              </Typography>
              <Typography fontWeight={700}>{formData.patientName || 'Não informado'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Medicações
              </Typography>
              <Typography fontWeight={700}>{formData.medications?.length || 0}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          <TextField
            fullWidth
            label="Observações"
            multiline
            onChange={(event) => updateField('observations', event.target.value)}
            rows={3}
            value={formData.observations}
          />
        </Paper>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          disabled={loading}
          onClick={onSave}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          {loading ? 'Salvando...' : 'Finalizar receita'}
        </Button>
      </Box>
    </Box>
  )
}
