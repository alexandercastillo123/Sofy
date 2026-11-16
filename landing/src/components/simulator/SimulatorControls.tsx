'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { SIMULATOR_PRESETS, SimulatorPreset } from '../../data/simulatorPresets';
import { SceneLayersConfig } from './VeinSceneBuilder';

interface SimulatorControlsProps {
  selectedPreset: SimulatorPreset;
  onSelectPreset: (preset: SimulatorPreset) => void;
  layers: SceneLayersConfig;
  onLayersChange: (layers: SceneLayersConfig) => void;
}

export default function SimulatorControls({
  selectedPreset,
  onSelectPreset,
  layers,
  onLayersChange
}: SimulatorControlsProps) {
  const diffDistance = (selectedPreset.diagonalDistance - selectedPreset.perpendicularDistance).toFixed(1);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Preset selector */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <TuneOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', color: 'text.secondary' }}>
            Estructuras Geológicas de Muestra
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {SIMULATOR_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <Chip
                key={preset.id}
                label={preset.name}
                onClick={() => onSelectPreset(preset)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.dark' : 'rgba(15, 118, 110, 0.08)'
                  }
                }}
              />
            );
          })}
        </Box>

        <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', fontSize: '0.85rem' }}>
          {selectedPreset.description}
        </Typography>
      </Paper>

      {/* Layer Toggles */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <LayersOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', color: 'text.secondary' }}>
            Capas del Modelo 3D
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={layers.vein}
                size="small"
                sx={{ color: '#2f7df6', '&.Mui-checked': { color: '#2f7df6' } }}
                onChange={(e) => onLayersChange({ ...layers, vein: e.target.checked })}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#2f7df6' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  Plano de Veta ({selectedPreset.strikeLabel} / {selectedPreset.dip}°)
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={layers.projects}
                size="small"
                sx={{ color: '#22c55e', '&.Mui-checked': { color: '#22c55e' } }}
                onChange={(e) => onLayersChange({ ...layers, projects: e.target.checked })}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22c55e' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  Proyectos de Avance (EP Perpendicular y PC Diagonal)
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={layers.grid}
                size="small"
                sx={{ color: '#64748b', '&.Mui-checked': { color: '#64748b' } }}
                onChange={(e) => onLayersChange({ ...layers, grid: e.target.checked })}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#64748b' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  Grilla Métrica y Orientación Norte
                </Typography>
              </Box>
            }
          />
        </Box>
      </Paper>

      {/* Engineering calculations summary card */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#f8fafc'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <CalculateOutlinedIcon fontSize="small" sx={{ color: 'secondary.main' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem', color: 'text.secondary' }}>
            Resultados de Ingeniería Minera
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 700, display: 'block' }}>
              PROYECTO EP (Perpendicular)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mt: 0.5 }}>
              {selectedPreset.perpendicularDistance} m
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Menor recorrido al blanco
            </Typography>
          </Box>

          <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ color: '#4338ca', fontWeight: 700, display: 'block' }}>
              PROYECTO PC (Diagonal)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mt: 0.5 }}>
              {selectedPreset.diagonalDistance} m
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Acceso con menor gradiente
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Optimización de Avance:
          </Typography>
          <Chip
            size="small"
            label={`Ahorro de ${diffDistance} m con EP`}
            color="success"
            sx={{ fontWeight: 700, fontSize: '0.75rem' }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

