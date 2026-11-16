'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#0f172a' }}>
        Ocurrió un error inesperado
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        {error.message || 'Error al procesar la solicitud'}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => reset()}>
        Reintentar
      </Button>
    </Box>
  );
}

