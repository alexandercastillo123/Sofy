'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h2>Error del Sistema</h2>
        <p style={{ color: '#64748b' }}>{error.message || 'Se produjo un error crítico.'}</p>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#0F766E',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}

