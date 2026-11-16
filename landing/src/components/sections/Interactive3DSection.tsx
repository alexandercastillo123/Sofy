'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { SIMULATOR_PRESETS, SimulatorPreset } from '../../data/simulatorPresets';
import { SceneLayersConfig } from '../simulator/VeinSceneBuilder';
import VeinViewer3D from '../simulator/VeinViewer3D';
import SimulatorControls from '../simulator/SimulatorControls';

interface Interactive3DSectionProps {
  onOpenGoogleTrial: () => void;
}

export default function Interactive3DSection({ onOpenGoogleTrial }: Interactive3DSectionProps) {
  const [selectedPreset, setSelectedPreset] = useState<SimulatorPreset>(SIMULATOR_PRESETS[0]);
  const [layers, setLayers] = useState<SceneLayersConfig>({
    vein: true,
    projects: true,
    grid: true
  });

  return (
    <Box id="simulador" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F6F7F8', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 6 }}>
          <Chip
            label="Simulador Geológico Three.js en Vivo"
            color="primary"
            variant="outlined"
            icon={<ViewInArOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
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
            Simulador 3D interactivo de cortes de veta
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Prueba aquí el mismo motor 3D Three.js integrado en el sistema web. Rota la escena, inspecciona el plano geológico de la veta y compara las labores de avance perpendicular vs diagonal.
          </Typography>
        </Box>

        {/* Interactive Workspace Grid */}
        <Grid container spacing={3.5} alignItems="flex-start">
          {/* Left Col: Three.js Interactive Viewer */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: '#cbd5e1',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12)'
              }}
            >
              <VeinViewer3D preset={selectedPreset} layers={layers} height={480} />

              {/* Bottom interaction note */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #e2e8f0'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TouchAppOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Arrastra para rotar · Rueda o pellizco para zoom · Botón derecho para desplazar
                  </Typography>
                </Box>
                <Button
                  component="a"
                  href="https://web-six-lilac-84.vercel.app/sign-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="text"
                  color="primary"
                  endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
                  sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                >
                  Cargar mis propios datos en Web
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Col: Controls & Engineering Metrics */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <SimulatorControls
              selectedPreset={selectedPreset}
              onSelectPreset={setSelectedPreset}
              layers={layers}
              onLayersChange={setLayers}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

