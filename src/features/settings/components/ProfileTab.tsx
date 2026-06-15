import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '@/contexts/AuthContext';

const ROLE_LABEL = { medico: 'Médico(a)', tecnico: 'Técnico(a)', administrador: 'Administrador(a)' };

// ─── Alterar senha ────────────────────────────────────────────────────────────

interface PasswordForm { current: string; next: string; confirm: string; }
type PasswordErrors = Partial<Record<keyof PasswordForm, string>>;

function validatePassword(f: PasswordForm): PasswordErrors {
  const e: PasswordErrors = {};
  if (!f.current) e.current = 'Informe a senha atual.';
  if (!f.next || f.next.length < 8) e.next = 'A nova senha deve ter no mínimo 8 caracteres.';
  if (f.next !== f.confirm) e.confirm = 'As senhas não coincidem.';
  return e;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ProfileTab() {
  const { user, updateUser } = useAuth();

  // Dados pessoais
  const [profile, setProfile] = useState({
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    crm: user?.crm ?? '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Senha
  const [pwd, setPwd] = useState<PasswordForm>({ current: '', next: '', confirm: '' });
  const [pwdErrors, setPwdErrors] = useState<PasswordErrors>({});
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const initials = user?.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase() ?? '';

  const handleProfileSave = async () => {
    if (!profile.fullName.trim() || !profile.email.trim()) return;
    setProfileSaving(true);
    await new Promise((r) => setTimeout(r, 700)); // TODO: api.put('/users/me')
    updateUser(profile);
    setProfileSaving(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSave = async () => {
    const errors = validatePassword(pwd);
    if (Object.keys(errors).length) { setPwdErrors(errors); return; }
    setPwdSaving(true);
    await new Promise((r) => setTimeout(r, 700)); // TODO: api.put('/users/me/password')
    setPwdSaving(false);
    setPwdSuccess(true);
    setPwd({ current: '', next: '', confirm: '' });
    setPwdErrors({});
    setTimeout(() => setPwdSuccess(false), 3000);
  };

  return (
    <Stack spacing={4}>
      {/* Avatar + cargo */}
      <Stack direction="row" spacing={2.5} alignItems="center">
        <Avatar sx={{ width: 64, height: 64, fontSize: 22, fontWeight: 700, bgcolor: 'primary.main' }}>
          {initials}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>{user?.fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role ? ROLE_LABEL[user.role] : ''} · {user?.crm}
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {/* Dados pessoais */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} mb={2}>Dados Pessoais</Typography>
        {profileSuccess && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Perfil atualizado com sucesso.</Alert>}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth label="Nome Completo"
              value={profile.fullName}
              onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
              error={!profile.fullName.trim()}
              helperText={!profile.fullName.trim() ? 'Campo obrigatório.' : ''}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth label="E-mail"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth label="CRM / Identificação Profissional"
              value={profile.crm}
              onChange={(e) => setProfile((p) => ({ ...p, crm: e.target.value }))}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth label="Cargo / Função"
              value={user?.role ? ROLE_LABEL[user.role] : ''}
              disabled
              helperText="Alteração de cargo requer aprovação do administrador."
            />
          </Grid>
        </Grid>
        <Button
          variant="contained" sx={{ mt: 2 }}
          startIcon={profileSaving ? <CircularProgress size={14} color="inherit" /> : <SaveOutlinedIcon />}
          onClick={handleProfileSave}
          disabled={profileSaving}
        >
          {profileSaving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Box>

      <Divider />

      {/* Alterar senha */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LockOutlinedIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" fontWeight={700}>Alterar Senha</Typography>
        </Stack>
        {pwdSuccess && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>Senha alterada com sucesso.</Alert>}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth label="Senha Atual" type="password"
              value={pwd.current}
              onChange={(e) => { setPwd((p) => ({ ...p, current: e.target.value })); setPwdErrors((p) => ({ ...p, current: undefined })); }}
              error={!!pwdErrors.current} helperText={pwdErrors.current}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth label="Nova Senha" type="password"
              value={pwd.next}
              onChange={(e) => { setPwd((p) => ({ ...p, next: e.target.value })); setPwdErrors((p) => ({ ...p, next: undefined })); }}
              error={!!pwdErrors.next} helperText={pwdErrors.next ?? 'Mínimo 8 caracteres.'}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth label="Confirmar Nova Senha" type="password"
              value={pwd.confirm}
              onChange={(e) => { setPwd((p) => ({ ...p, confirm: e.target.value })); setPwdErrors((p) => ({ ...p, confirm: undefined })); }}
              error={!!pwdErrors.confirm} helperText={pwdErrors.confirm}
            />
          </Grid>
        </Grid>
        <Button
          variant="outlined" sx={{ mt: 2 }}
          startIcon={pwdSaving ? <CircularProgress size={14} color="inherit" /> : <LockOutlinedIcon />}
          onClick={handlePasswordSave}
          disabled={pwdSaving}
        >
          {pwdSaving ? 'Salvando...' : 'Alterar Senha'}
        </Button>
      </Box>
    </Stack>
  );
}
