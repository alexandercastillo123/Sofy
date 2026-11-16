'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface GoogleAuthModalProps {
  open: boolean;
  onClose: () => void;
  planName?: string;
}

export default function GoogleAuthModal({ open, onClose, planName = 'Prueba Gratuita 14 días' }: GoogleAuthModalProps) {
  const [step, setStep] = useState<'select' | 'authenticating' | 'success'>('select');
  const [selectedEmail, setSelectedEmail] = useState('');

  const accounts = [
    { name: 'Alexander Ríos', email: 'alexander.rios@gmail.com', avatarBg: '#0F766E' },
    { name: 'Geología y Minería SAC', email: 'contacto@geomina.pe', avatarBg: '#D97706' }
  ];

  const handleSelectAccount = (email: string) => {
    setSelectedEmail(email);
    setStep('authenticating');

    setTimeout(() => {
      setStep('success');
    }, 1200);
  };

  const handleReset = () => {
    setStep('select');
    setSelectedEmail('');
    onClose();
  };

  const handleRedirectToWeb = () => {
    window.location.href = 'https://web-six-lilac-84.vercel.app/sign-in';
  };

  return (
    <Dialog
      open={open}
      onClose={step === 'authenticating' ? undefined : handleReset}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Acceso con Google
          </Typography>
        </Box>
        {step !== 'authenticating' && (
          <IconButton size="small" onClick={handleReset}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {step === 'select' && (
        <>
          <DialogTitle sx={{ pt: 2, pb: 1, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Elige una cuenta de Google
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Para activar {planName} en SOFI Mining
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ py: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accounts.map((acc) => (
                <Box
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc.email)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(15, 118, 110, 0.05)',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: acc.avatarBg, width: 38, height: 38, fontSize: '0.9rem', fontWeight: 600 }}>
                    {acc.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                      {acc.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {acc.email}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Box
                onClick={() => handleSelectAccount('nueva.cuenta@gmail.com')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px dashed',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'background.default' }
                }}
              >
                <Avatar sx={{ bgcolor: 'grey.300', color: 'text.primary', width: 38, height: 38, fontSize: '0.9rem' }}>
                  +
                </Avatar>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Usar otra cuenta de Google
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, px: 1, color: 'text.secondary' }}>
              <SecurityOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                Conexión cifrada OAuth 2.0. Sin cargos ocultos ni tarjeta bancaria requerida.
              </Typography>
            </Box>
          </DialogContent>
        </>
      )}

      {step === 'authenticating' && (
        <DialogContent sx={{ py: 6, textAlign: 'center' }}>
          <CircularProgress size={44} sx={{ color: 'primary.main', mb: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Conectando con Google...
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Activando tus 14 días de prueba gratuita en SOFI Cloud
          </Typography>
        </DialogContent>
      )}

      {step === 'success' && (
        <>
          <DialogContent sx={{ py: 4, textAlign: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'success.light',
                color: 'success.dark',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#15803D' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
              ¡Prueba Gratuita Activada!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, px: 2 }}>
              Cuenta vinculada a <strong>{selectedEmail}</strong>. Tienes acceso completo a la app móvil Android y al sistema web por los próximos 14 días.
            </Typography>

            <Alert severity="success" sx={{ mt: 3, textAlign: 'left', borderRadius: 2 }}>
              <strong>Credenciales de prueba listas:</strong> Puedes sincronizar de inmediato tus mediciones desde la app móvil Android.
            </Alert>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRedirectToWeb}
              sx={{ py: 1.2, fontWeight: 700 }}
            >
              Ir a la Plataforma Web SOFI (Iniciar Sesión)
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

