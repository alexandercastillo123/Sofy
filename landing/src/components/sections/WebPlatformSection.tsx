'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { WEB_FEATURES, WebFeature } from '../../data/webFeatures';

export default function WebPlatformSection() {
  const [selectedFeature, setSelectedFeature] = useState<WebFeature>(WEB_FEATURES[0]);

  return (
    <Box id="web" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 7 }}>
          <Chip
            label="Plataforma Web SOFI"
            color="primary"
            variant="outlined"
            icon={<LaptopMacOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{
              fontWeight: 700,
              fontSize: '0.8rem',
              borderColor: 'rgba(15, 118, 110, 0.3)',
              bgcolor: 'rgba(15, 118, 110, 0.05)',
              color: 'primary.main',
              mb: 2
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, color: '#0f172a', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
          >
            Qué encuentras dentro del sistema web
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Explora la interfaz de usuario corporativa de SOFI. Un panel de control sobrio, limpio y sin estridencias, diseñado para ingenieros de minas, geólogos y gerencia técnica.
          </Typography>
        </Box>

        {/* Feature Pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mb: 5 }}>
          {WEB_FEATURES.map((feat) => {
            const isSelected = feat.id === selectedFeature.id;
            return (
              <Chip
                key={feat.id}
                label={feat.title}
                onClick={() => setSelectedFeature(feat)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 2.2,
                  px: 1.5,
                  cursor: 'pointer',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : '#ffffff',
                  boxShadow: isSelected ? '0 4px 12px rgba(15, 118, 110, 0.2)' : 'none',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.dark' : 'rgba(15, 118, 110, 0.06)'
                  }
                }}
              />
            );
          })}
        </Box>

        {/* Showcase Canvas */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: '#cbd5e1',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.1)',
            bgcolor: '#ffffff'
          }}
        >
          {/* Top Browser Bar */}
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              bgcolor: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #1e293b'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22c55e' }} />
              </Box>
              <Box
                sx={{
                  bgcolor: '#1e293b',
                  px: 2,
                  py: 0.4,
                  borderRadius: 1.5,
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}
              >
                https://sofi.pe/app/{selectedFeature.id}
              </Box>
            </Box>
            <Chip
              size="small"
              label={selectedFeature.badge}
              sx={{ bgcolor: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf', fontWeight: 700, fontSize: '0.7rem' }}
            />
          </Box>

          <Grid container>
            {/* Screenshot */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box
                component="img"
                src={selectedFeature.imageSrc}
                alt={selectedFeature.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: 520,
                  objectFit: 'cover',
                  borderRight: { lg: '1px solid #e2e8f0' }
                }}
              />
            </Grid>

            {/* Feature Description Panel */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {selectedFeature.subtitle}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5, mb: 1.5 }}>
                  {selectedFeature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}>
                  {selectedFeature.description}
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.75rem', mb: 1.5 }}>
                  Aspectos Destacados:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
                  {selectedFeature.highlights.map((h, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.2, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {h}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Button
                    component="a"
                    href="https://web-six-lilac-84.vercel.app/sign-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: 700, py: 1.2 }}
                  >
                    Abrir Plataforma Web en Vivo
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

