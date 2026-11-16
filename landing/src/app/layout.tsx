import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeRegistry from '../theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'SOFI · Plataforma Geológica y Minera de Simulación 3D',
  description: 'Levantamiento geológico en interior mina con Android (brújula y clinómetro) y simulación 3D interactiva en la web para optimización de cortes de veta.',
  keywords: ['geología', 'minería', 'corte de vetas', 'three.js', 'brújula digital', 'clinómetro', 'simulación 3D', 'minería subterránea'],
  authors: [{ name: 'SOFI Mining' }],
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  themeColor: '#0F766E',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}

