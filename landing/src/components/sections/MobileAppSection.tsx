'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MOBILE_FEATURES, MobileFeature } from '../../data/mobileFeatures';

export default function MobileAppSection() {
  const [activeFeature, setActiveFeature] = useState<MobileFeature>(MOBILE_FEATURES[0]);

  return (
    <Box id="android" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F6F7F8', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 7 }}>
          <Chip
            label="Aplicación Móvil Android en Mina"
            color="primary"
            variant="outlined"
            icon={<SmartphoneOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
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
            Herramientas geológicas de alta precisión en tu teléfono
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Explora las pantallas reales de la aplicación Android de SOFI para interior mina. Diseñada con interfaz de alto contraste y calibración física para trabajo pesado.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {/* Feature Selector Tabs (Left Col) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {MOBILE_FEATURES.map((feat) => {
                const isSelected = feat.id === activeFeature.id;
                return (
                  <Paper
                    key={feat.id}
                    elevation={0}
                    onClick={() => setActiveFeature(feat)}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      backgroundColor: isSelected ? '#ffffff' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 16px -4px rgba(15, 118, 110, 0.15)' : 'none',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        borderColor: isSelected ? 'primary.main' : '#cbd5e1'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: isSelected ? 'primary.main' : 'text.disabled'
                          }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, color: isSelected ? 'primary.main' : 'text.primary' }}
                          >
                            {feat.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {feat.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        size="small"
                        label={feat.badge}
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          bgcolor: isSelected ? 'rgba(15, 118, 110, 0.1)' : '#f1f5f9',
                          color: isSelected ? 'primary.main' : 'text.secondary'
                        }}
                      />
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Grid>

          {/* Active Feature Showcase (Right Col) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: '#cbd5e1',
                bgcolor: '#ffffff',
                boxShadow: '0 18px 36px -12px rgba(15, 23, 42, 0.08)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Chip
                  label={activeFeature.badge}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  CAPTURA EN VIVO EN ANDROID
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                {activeFeature.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}>
                {activeFeature.description}
              </Typography>

              {/* Mobile Phone Mockup Frame */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 320,
                  mx: 'auto',
                  borderRadius: 4,
                  p: 1.25,
                  bgcolor: '#0f172a',
                  boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.3)',
                  border: '3px solid #334155'
                }}
              >
                {/* Speaker pill notch */}
                <Box
                  sx={{
                    width: 70,
                    height: 5,
                    bgcolor: '#475569',
                    borderRadius: 3,
                    mx: 'auto',
                    mb: 1
                  }}
                />

                {/* Screenshot inside frame */}
                <Box
                  component="img"
                  src={activeFeature.imageSrc}
                  alt={activeFeature.title}
                  sx={{
                    width: '100%',
                    height: 380,
                    objectFit: 'contain',
                    bgcolor: '#000000',
                    borderRadius: 3,
                    display: 'block'
                  }}
                />

                {/* Bottom home indicator */}
                <Box
                  sx={{
                    width: 90,
                    height: 4,
                    bgcolor: '#475569',
                    borderRadius: 2,
                    mx: 'auto',
                    mt: 1
                  }}
                />
              </Box>

              {/* Specs list */}
              <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid #e2e8f0' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 1 }}>
                  Especificaciones técnicas:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {activeFeature.specs.map((spec, sIdx) => (
                    <Chip
                      key={sIdx}
                      icon={<CheckCircleOutlineIcon sx={{ fontSize: '0.9rem !important', color: 'primary.main' }} />}
                      label={spec}
                      size="small"
                      sx={{ bgcolor: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 500, fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

