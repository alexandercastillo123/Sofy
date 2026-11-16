'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

interface NavbarProps {
  onOpenGoogleTrial: () => void;
}

export default function Navbar({ onOpenGoogleTrial }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Flujo Móvil & Web', href: '#workflow' },
    { label: 'App Android', href: '#android' },
    { label: 'Plataforma Web', href: '#web' },
    { label: 'Simulador 3D', href: '#simulador' },
    { label: 'Planes y Precios', href: '#precios' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 68, display: 'flex', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <Box
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)'
              }}
            >
              <TerrainOutlinedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  SOFI
                </Typography>
                <Box
                  sx={{
                    px: 0.75,
                    py: 0.15,
                    borderRadius: 1,
                    backgroundColor: 'rgba(15, 118, 110, 0.1)',
                    color: 'primary.main',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  Mining AI
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', display: 'block' }}>
                Simulador de Cortes de Veta
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  px: 1.5,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Action CTAs */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Button
              component="a"
              href="https://web-six-lilac-84.vercel.app/sign-in"
              variant="text"
              color="inherit"
              sx={{ fontWeight: 600, fontSize: '0.875rem', color: 'text.secondary' }}
            >
              Iniciar sesión
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onOpenGoogleTrial}
              endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}
              sx={{ fontWeight: 700, fontSize: '0.875rem', px: 2.2, py: 0.9 }}
            >
              14 días gratis
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={() => setMobileOpen(true)}
              edge="end"
              aria-label="Abrir menú"
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 280, p: 2, display: 'flex', flexDirection: 'column' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            SOFI
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flex: 1 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 1.5, py: 1 }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            component="a"
            href="https://web-six-lilac-84.vercel.app/sign-in"
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            Iniciar sesión
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setMobileOpen(false);
              onOpenGoogleTrial();
            }}
            sx={{ fontWeight: 700 }}
          >
            Reclamar 14 días gratis
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}

