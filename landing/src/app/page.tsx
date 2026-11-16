'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import WorkflowSyncSection from '../components/sections/WorkflowSyncSection';
import MobileAppSection from '../components/sections/MobileAppSection';
import WebPlatformSection from '../components/sections/WebPlatformSection';
import Interactive3DSection from '../components/sections/Interactive3DSection';
import PricingSection from '../components/sections/PricingSection';
import TrialCtaSection from '../components/sections/TrialCtaSection';
import FaqSection from '../components/sections/FaqSection';
import GoogleAuthModal from '../components/modals/GoogleAuthModal';
import PricingModal from '../components/modals/PricingModal';
import { SubscriptionPlan } from '../data/plans';

export default function LandingPage() {
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const handleOpenGoogleTrial = () => {
    setGoogleModalOpen(true);
  };

  const handleSelectPaidPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setPricingModalOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top sticky Navigation */}
      <Navbar onOpenGoogleTrial={handleOpenGoogleTrial} />

      {/* Main Sections */}
      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection onOpenGoogleTrial={handleOpenGoogleTrial} />
        <WorkflowSyncSection />
        <MobileAppSection />
        <WebPlatformSection />
        <Interactive3DSection onOpenGoogleTrial={handleOpenGoogleTrial} />
        <PricingSection
          onOpenGoogleTrial={handleOpenGoogleTrial}
          onSelectPaidPlan={handleSelectPaidPlan}
        />
        <TrialCtaSection onOpenGoogleTrial={handleOpenGoogleTrial} />
        <FaqSection />
      </Box>

      {/* Footer */}
      <Footer />

      {/* Interactive Simulation Modals */}
      <GoogleAuthModal
        open={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        planName="Prueba Gratuita 14 días"
      />

      <PricingModal
        open={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        plan={selectedPlan}
        onSwitchToGoogleTrial={() => {
          setPricingModalOpen(false);
          setGoogleModalOpen(true);
        }}
      />
    </Box>
  );
}

