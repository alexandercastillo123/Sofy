'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F766E',
      light: '#14B8A6',
      dark: '#115E59',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#D97706',
      light: '#F59E0B',
      dark: '#B45309',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F6F7F8',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F232B',
      secondary: '#4B5563',
      disabled: '#9CA3AF'
    },
    divider: '#E5E7EB',
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#15803D',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#B45309',
      contrastText: '#1F232B'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#B91C1C',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.25
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.3
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#4B5563'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1F232B'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
      color: '#4B5563'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 18px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        containedPrimary: {
          backgroundColor: '#0F766E',
          '&:hover': {
            backgroundColor: '#115E59'
          }
        },
        containedSecondary: {
          backgroundColor: '#D97706',
          '&:hover': {
            backgroundColor: '#B45309'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6
        }
      }
    }
  }
});

