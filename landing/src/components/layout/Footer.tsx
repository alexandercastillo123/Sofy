'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        pt: 8,
        pb: 5,
        borderTop: '1px solid #1e293b'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Col */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: '#14B8A6',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}
              >
                <TerrainOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                SOFI
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6, pr: { md: 4 } }}>
              Plataforma geológica y minera de inteligencia artificial para levantamiento estructural en interior mina con Android y simulación 3D avanzada en la web.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3, color: '#64748b' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <SecurityOutlinedIcon fontSize="small" sx={{ color: '#14B8A6' }} />
                <Typography variant="caption" sx={{ color: '#cbd5e1' }}>Cifrado SSL 256-bit</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CloudDoneOutlinedIcon fontSize="small" sx={{ color: '#14B8A6' }} />
                <Typography variant="caption" sx={{ color: '#cbd5e1' }}>Sincronización en la Nube</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Nav Col 1 */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              Solución Geológica
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#workflow" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Sincronización Campo-Oficina
              </Link>
              <Link href="#android" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                App Android de Mina
              </Link>
              <Link href="https://web-six-lilac-84.vercel.app/sign-in" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Sistema Web (Iniciar Sesión)
              </Link>
              <Link href="#simulador" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Simulador 3D Three.js
              </Link>
            </Box>
          </Grid>

          {/* Nav Col 2 */}
          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              Operaciones y Cálculo
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#precios" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Planes y Licenciamiento
              </Link>
              <Link href="#precios" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Prueba 14 días gratis
              </Link>
              <Link href="#faq" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Preguntas Frecuentes
              </Link>
              <Link href="#" underline="hover" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Manual de Brújula y Sensores
              </Link>
            </Box>
          </Grid>

          {/* Nav Col 3 */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              Contacto Técnico
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem', mb: 1 }}>
              Soporte de ingeniería y despliegue minero:
            </Typography>
            <Typography variant="body2" sx={{ color: '#14B8A6', fontWeight: 600, fontSize: '0.9rem' }}>
              contacto@sofi.pe
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
              Lima · Arequipa · Cusco — Perú
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#1e293b' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} SOFI Platform. Todos los derechos reservados. Desarrollado con arquitectura de alta precisión.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" underline="hover" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
              Privacidad y Datos de Mina
            </Link>
            <Link href="#" underline="hover" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
              Términos del Servicio
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

