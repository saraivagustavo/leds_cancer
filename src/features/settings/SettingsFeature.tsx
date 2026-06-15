import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { ProfileTab }       from './components/ProfileTab';
import { AppearanceTab }    from './components/AppearanceTab';
import { NotificationsTab } from './components/NotificationsTab';
import { SecurityTab }      from './components/SecurityTab';

type SettingsTab = 'profile' | 'appearance' | 'notifications' | 'security';

const TABS: { value: SettingsTab; label: string; Icon: React.ElementType }[] = [
  { value: 'profile',       label: 'Perfil',          Icon: PersonOutlineIcon              },
  { value: 'appearance',    label: 'Aparência',        Icon: PaletteOutlinedIcon            },
  { value: 'notifications', label: 'Notificações',     Icon: NotificationsNoneOutlinedIcon  },
  { value: 'security',      label: 'Segurança',        Icon: ShieldOutlinedIcon             },
];

export function SettingsFeature() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <Stack spacing={3}>
      {/* Cabeçalho */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <SettingsOutlinedIcon color="primary" />
        <Box>
          <Typography variant="h5" fontWeight={700}>Configurações</Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie seu perfil, aparência e preferências do sistema
          </Typography>
        </Box>
      </Stack>

      {/* Card com tabs */}
      <Card>
        <Tabs
          value={activeTab}
          onChange={(_, v: SettingsTab) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          {TABS.map(({ value, label, Icon }) => (
            <Tab
              key={value}
              value={value}
              label={label}
              icon={<Icon fontSize="small" />}
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600, minHeight: 52, gap: 0.5 }}
            />
          ))}
        </Tabs>

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {activeTab === 'profile'       && <ProfileTab />}
          {activeTab === 'appearance'    && <AppearanceTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security'      && <SecurityTab />}
        </CardContent>
      </Card>
    </Stack>
  );
}
