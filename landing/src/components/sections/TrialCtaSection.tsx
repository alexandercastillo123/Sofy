'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TrialCtaSectionProps {
  onOpenGoogleTrial: () => void;
}

export default function TrialCtaSection({ onOpenGoogleTrial }: TrialCtaSectionProps) {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#0f172a', color: '#ffffff' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: '#115E59',
            backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(20, 184, 166, 0.4), transparent 60%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="overline"
                sx={{ color: '#99f6e4', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.8rem' }}
              >
                ACCESO INMEDIATO SIN COSTO
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontWeight: 800, color: '#ffffff', mt: 1, fontSize: { xs: '1.85rem', sm: '2.5rem' } }}
              >
                Comienza a optimizar tus labores mineras hoy mismo
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#ccfbf1', mt: 2, fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 620 }}
              >
                Reclama tus 14 días de prueba gratuita utilizando tu cuenta de Google. Sincroniza tus mediciones estructurales de campo y visualiza en 3D tus proyectos en minutos.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#2dd4bf', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Sin tarjeta requerida
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#2dd4bf', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    App Android + Web 3D
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#2dd4bf', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Soporte técnico geológico
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={onOpenGoogleTrial}
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                }
                sx={{
                  bgcolor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  py: 1.5,
                  px: 3.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    color: '#0f172a'
                  }
                }}
              >
                Reclamar con Google
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

