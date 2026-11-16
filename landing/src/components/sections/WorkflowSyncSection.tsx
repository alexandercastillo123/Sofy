'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function WorkflowSyncSection() {
  const steps = [
    {
      number: '01',
      title: 'En Interior Mina (Android)',
      subtitle: 'Captura estructural directa en labor',
      icon: <SmartphoneOutlinedIcon sx={{ fontSize: 28, color: '#0F766E' }} />,
      description: 'El geólogo o topógrafo toma lectura de rumbo y buzamiento apoyando el celular sobre la veta. Registra coordenadas UTM de estación y frente sin conexión a internet.',
      specs: [
        'Brújula y clinómetro digital integrados',
        'Registro de coordenadas EM, P2 y cota',
        'Control de potencia y tipo de roca',
        'Almacenamiento seguro offline'
      ]
    },
    {
      number: '02',
      title: 'Sincronización en la Nube',
      subtitle: 'Consolidación automática y segura',
      icon: <CloudSyncOutlinedIcon sx={{ fontSize: 28, color: '#D97706' }} />,
      description: 'Al conectarse a la red en bocamina o campamento, las observaciones de campo se enlazan instantáneamente con la base de datos central de la mina.',
      specs: [
        'Sincronización bidireccional automática',
        'Validación de consistencia geométrica',
        'Control de autoría y auditoría de cambios',
        'Acceso centralizado para el equipo técnico'
      ]
    },
    {
      number: '03',
      title: 'En Oficina Técnica (Web)',
      subtitle: 'Simulación 3D y presupuesto de avance',
      icon: <LaptopMacOutlinedIcon sx={{ fontSize: 28, color: '#0F766E' }} />,
      description: 'La plataforma web genera en segundos el modelo 3D con Three.js, proyecta los cortes de labor subterránea (EP y PC) y calcula costos de perforación y voladura.',
      specs: [
        'Simulación 3D interactiva orbital',
        'Comparativa analítica EP vs PC',
        'Estimación de volumen, tonelaje y avance',
        'Exportación de informes ejecutivos'
      ]
    }
  ];

  return (
    <Box id="workflow" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.8rem' }}
          >
            FLUJO DE TRABAJO INTEGRADO
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mt: 1, color: '#0f172a', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
          >
            Cómo el trabajo en el celular se refleja de inmediato en la web
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Elimina el desfase entre las mediciones en frente de avance y la toma de decisiones en planeamiento minero con un pipeline digital sin papeles.
          </Typography>
        </Box>

        {/* 3 Steps Grid */}
        <Grid container spacing={3.5}>
          {steps.map((step, idx) => (
            <Grid key={step.number} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: '#f8fafc',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 28px -8px rgba(15, 23, 42, 0.08)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      bgcolor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: 'text.disabled', letterSpacing: '0.04em' }}
                  >
                    {step.number}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>
                  {step.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block', mb: 2 }}>
                  {step.subtitle}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}>
                  {step.description}
                </Typography>

                <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #e2e8f0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 1 }}>
                    Capacidades clave:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {step.specs.map((spec, sIdx) => (
                      <Box key={sIdx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
                        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                          {spec}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

