'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface HeroSectionProps {
  onOpenGoogleTrial: () => void;
}

export default function HeroSection({ onOpenGoogleTrial }: HeroSectionProps) {
  return (
    <Box
      sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #F6F7F8 0%, #FFFFFF 100%)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column: Value Proposition */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 2 }}>
              <Chip
                label="Ecosistema Minero Integrado · Android & Web"
                color="primary"
                variant="outlined"
                icon={<SyncAltOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  borderColor: 'rgba(15, 118, 110, 0.3)',
                  bgcolor: 'rgba(15, 118, 110, 0.05)',
                  color: 'primary.main',
                  py: 0.5
                }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.25rem', sm: '2.85rem', md: '3.25rem' },
                lineHeight: 1.15,
                color: '#0f172a',
                letterSpacing: '-0.03em'
              }}
            >
              De la medición en interior mina a la simulación 3D en la web.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2.5,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                maxWidth: 580
              }}
            >
              Captura rumbo, buzamiento y coordenadas de afloramiento con tu smartphone Android sin conexión.
              Al sincronizar, la plataforma web modela la veta en 3D interactivo con Three.js y optimiza los proyectos de corte subterráneo en minutos.
            </Typography>

            {/* CTAs */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onOpenGoogleTrial}
                endIcon={<ArrowForwardOutlinedIcon />}
                sx={{
                  py: 1.4,
                  px: 3.2,
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(15, 118, 110, 0.3)'
                }}
              >
                Probar 14 días gratis con Google
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                size="large"
                href="#simulador"
                startIcon={<ViewInArOutlinedIcon />}
                sx={{
                  py: 1.4,
                  px: 2.8,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Ver Simulador 3D
              </Button>
            </Box>

            {/* Highlights */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.secondary' }}>
                  Sin tarjeta de crédito
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.secondary' }}>
                  Android 100% offline en mina
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.secondary' }}>
                  Simulador Three.js interactivo
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Visual Composite Card (Mobile + Web preview) */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Main Web Preview Card */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: '#cbd5e1',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px -15px rgba(15, 23, 42, 0.12)',
                  bgcolor: '#ffffff'
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    bgcolor: '#0f172a',
                    color: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LaptopOutlinedIcon sx={{ fontSize: 18, color: '#14B8A6' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
                      SOFI WEB · Simulación 3D de Veta
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.75 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
                  </Box>
                </Box>

                <Box
                  component="img"
                  src="/assets/images/web/web-simulation.png"
                  alt="Simulación 3D en SOFI Web"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    maxHeight: 280,
                    objectFit: 'cover'
                  }}
                />

                <Box sx={{ p: 2, bgcolor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      Proyecto Veta Esperanza · Nivel 3850
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Rumbo N45°E · Buzamiento 65°SE
                    </Typography>
                  </Box>
                  <Button
                    component="a"
                    href="https://web-six-lilac-84.vercel.app/sign-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: '0.75rem', py: 0.5 }}
                  >
                    Abrir Web
                  </Button>
                </Box>
              </Paper>

              {/* Floating Mobile Phone Card */}
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: { xs: 10, sm: -30 },
                  width: { xs: 180, sm: 220 },
                  borderRadius: 3,
                  border: '2px solid',
                  borderColor: '#0F766E',
                  overflow: 'hidden',
                  boxShadow: '0 25px 40px -10px rgba(15, 118, 110, 0.25)',
                  bgcolor: '#ffffff'
                }}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    bgcolor: '#0F766E',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75
                  }}
                >
                  <SmartphoneOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
                    Brújula Digital Android
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src="/assets/images/android/BrujulaDigitalSofyAndroid.jpeg"
                  alt="Brújula digital en Android"
                  sx={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

