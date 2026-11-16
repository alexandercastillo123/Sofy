'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { SubscriptionPlan } from '../../data/plans';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
  onSwitchToGoogleTrial: () => void;
}

export default function PricingModal({ open, onClose, plan, onSwitchToGoogleTrial }: PricingModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!plan) return null;

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
          Suscripción Profesional SOFI
        </Typography>
        {!loading && (
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {!success ? (
        <>
          <DialogTitle sx={{ pt: 1, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {plan.name}
              </Typography>
              <Chip
                label={`$${plan.priceUsd} USD / ${plan.billingPeriod === 'annual' ? 'año' : 'mes'}`}
                color="primary"
                sx={{ fontWeight: 700 }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {plan.description}
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ py: 1.5 }}>
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#0f172a' }}>
                Resumen de beneficios incluidos:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, '& li': { fontSize: '0.85rem', color: 'text.secondary', mb: 0.5 } }}>
                {plan.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </Box>
            </Box>

            <Alert severity="info" sx={{ mb: 2, borderRadius: 2, fontSize: '0.82rem' }}>
              <strong>Modo de prueba / simulación:</strong> No se generará ningún cargo real. Este flujo simula la pasarela de pago para la activación en Vercel.
            </Alert>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 1 }}>
              <LockOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                Transacción simulada bajo cifrado SSL de 256 bits y cumplimiento PCI-DSS.
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5, flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSimulatePayment}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CreditCardOutlinedIcon />}
              sx={{ py: 1.2, fontWeight: 700 }}
            >
              {loading ? 'Procesando suscripción simulada...' : `Confirmar Suscripción ($${plan.priceUsd} USD)`}
            </Button>

            <Button
              fullWidth
              variant="text"
              color="inherit"
              onClick={() => {
                handleClose();
                onSwitchToGoogleTrial();
              }}
              sx={{ color: 'text.secondary', fontSize: '0.85rem' }}
            >
              ¿Prefieres probar primero? Reclamar 14 días gratis con Google
            </Button>
          </DialogActions>
        </>
      ) : (
        <DialogContent sx={{ py: 5, textAlign: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#15803D' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ¡Suscripción Simulada con Éxito!
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, px: 2 }}>
            El plan <strong>{plan.name}</strong> ha sido activado en tu entorno de pruebas. Las licencias móviles y web están listas para usar.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = 'https://web-six-lilac-84.vercel.app/sign-in';
            }}
            sx={{ mt: 3, px: 4, fontWeight: 700 }}
          >
            Ir a la Plataforma Web
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
}

