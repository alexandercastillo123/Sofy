'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { FAQ_DATA } from '../../data/faqData';

export default function FaqSection() {
  const [expanded, setExpanded] = useState<string | false>(FAQ_DATA[0].id);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box id="faq" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F6F7F8' }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="Preguntas Frecuentes"
            color="primary"
            variant="outlined"
            icon={<HelpOutlineOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
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
            Respuestas a tus dudas sobre SOFI
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, fontSize: '1.05rem' }}>
            Todo lo que necesitas saber sobre el uso de la app Android en mina, la precisión del simulador 3D y la prueba gratuita.
          </Typography>
        </Box>

        {/* Accordions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {FAQ_DATA.map((faq) => {
            const isCurrentExpanded = expanded === faq.id;
            return (
              <Accordion
                key={faq.id}
                expanded={isCurrentExpanded}
                onChange={handleChange(faq.id)}
                elevation={0}
                sx={{
                  borderRadius: '12px !important',
                  border: '1px solid',
                  borderColor: isCurrentExpanded ? 'primary.main' : 'divider',
                  backgroundColor: '#ffffff',
                  '&:before': { display: 'none' },
                  boxShadow: isCurrentExpanded ? '0 4px 16px -4px rgba(15, 118, 110, 0.12)' : 'none'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: isCurrentExpanded ? 'primary.main' : 'text.secondary' }} />}
                  sx={{ py: 1.25, px: 2.5 }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isCurrentExpanded ? 'primary.main' : '#0f172a', fontSize: '1rem' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.925rem' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

