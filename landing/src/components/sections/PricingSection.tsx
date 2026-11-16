'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '../../data/plans';

interface PricingSectionProps {
  onOpenGoogleTrial: () => void;
  onSelectPaidPlan: (plan: SubscriptionPlan) => void;
}

export default function PricingSection({ onOpenGoogleTrial, onSelectPaidPlan }: PricingSectionProps) {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const trialPlan = SUBSCRIPTION_PLANS.find((p) => p.tier === 'trial')!;
  const basicPlan = SUBSCRIPTION_PLANS.find((p) => p.tier === 'basic' && p.billingPeriod === period)!;
  const premiumPlan = SUBSCRIPTION_PLANS.find((p) => p.tier === 'premium' && p.billingPeriod === period)!;

  const displayPlans = [
    { ...trialPlan, ctaLabel: 'Reclamar 14 días con Google', isTrial: true },
    { ...basicPlan, ctaLabel: `Elegir Básico ($${basicPlan.priceUsd})`, isTrial: false },
    { ...premiumPlan, ctaLabel: `Elegir Premium ($${premiumPlan.priceUsd})`, isTrial: false }
  ];

  return (
    <Box id="precios" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.12em', fontSize: '0.8rem' }}
          >
            PLANES Y SUSCRIPCIÓN TRANSPARENTE
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mt: 1, color: '#0f172a', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
          >
            Empieza gratis hoy y escala según tu operación
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Prueba todas las funcionalidades durante 14 días con tu cuenta de Google. Sin tarjeta ni compromisos.
          </Typography>

          {/* Billing Cycle Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4 }}>
            <ToggleButtonGroup
              value={period}
              exclusive
              onChange={(_, val) => val && setPeriod(val)}
              size="small"
              sx={{
                bgcolor: '#f1f5f9',
                p: 0.5,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                '& .MuiToggleButton-root': {
                  borderRadius: 1.5,
                  px: 2.5,
                  py: 0.75,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  border: 'none',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    bgcolor: '#ffffff',
                    color: 'text.primary',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                  }
                }
              }}
            >
              <ToggleButton value="monthly">Facturación Mensual</ToggleButton>
              <ToggleButton value="annual">Facturación Anual</ToggleButton>
            </ToggleButtonGroup>

            {period === 'annual' && (
              <Chip
                label="Ahorra hasta $157 USD"
                color="secondary"
                size="small"
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </Box>

        {/* Pricing Cards Grid */}
        <Grid container spacing={3.5} alignItems="stretch">
          {displayPlans.map((plan) => {
            const isHighlighted = plan.highlighted;
            return (
              <Grid key={plan.id} size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: isHighlighted ? 'primary.main' : 'divider',
                    position: 'relative',
                    bgcolor: isHighlighted ? '#ffffff' : '#f8fafc',
                    boxShadow: isHighlighted ? '0 16px 36px -10px rgba(15, 118, 110, 0.15)' : 'none',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  {isHighlighted && (
                    <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                      <Chip
                        icon={<StarBorderOutlinedIcon sx={{ fontSize: '1rem !important', color: '#ffffff' }} />}
                        label="Más Recomendado para Mina"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 700, px: 1, py: 0.5, boxShadow: '0 2px 8px rgba(15, 118, 110, 0.4)' }}
                      />
                    </Box>
                  )}

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75, minHeight: 40 }}>
                      {plan.description}
                    </Typography>
                  </Box>

                  {/* Price Header */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      ${plan.priceUsd}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      USD {plan.isTrial ? '/ 14 días' : plan.billingPeriod === 'annual' ? '/ año' : '/ mes'}
                    </Typography>
                  </Box>

                  {plan.savingsUsd && (
                    <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 700, display: 'block', mb: 2 }}>
                      Ahorro de ${plan.savingsUsd} USD frente al pago mensual
                    </Typography>
                  )}

                  {/* Action CTA */}
                  <Button
                    fullWidth
                    variant={isHighlighted || plan.isTrial ? 'contained' : 'outlined'}
                    color={plan.isTrial ? 'secondary' : 'primary'}
                    size="large"
                    onClick={() => {
                      if (plan.isTrial) {
                        onOpenGoogleTrial();
                      } else {
                        onSelectPaidPlan(plan);
                      }
                    }}
                    endIcon={<ArrowForwardOutlinedIcon />}
                    sx={{
                      my: 3,
                      py: 1.25,
                      fontWeight: 700,
                      boxShadow: isHighlighted ? '0 4px 12px rgba(15, 118, 110, 0.3)' : 'none'
                    }}
                  >
                    {plan.ctaLabel}
                  </Button>

                  {/* Features list */}
                  <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider', flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 1.5 }}>
                      Incluido en este plan:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                      {plan.features.map((feat, fIdx) => (
                        <Box key={fIdx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.2, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.85rem' }}>
                            {feat}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

