import React, { useState, useEffect, lazy, Suspense } from 'react';
import CeremonialCurtain from './components/sections/CeremonialCurtain';
import Header from './components/sections/Header';
import HeroSection from './components/sections/HeroSection';
import CeremonyTimeline from './components/sections/CeremonyTimeline';
import ApprovedGearMatrix from './components/sections/ApprovedGearMatrix';
import RoyalEventGallery from './components/sections/RoyalEventGallery';
import RoyalConciergeStudio from './components/sections/RoyalConciergeStudio';
import Footer from './components/sections/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

const BeverageModal = lazy(() => import('./components/sections/BeverageModal'));
const PrintProposalModal = lazy(() => import('./components/sections/PrintProposalModal'));

export function App() {
  const [isBeverageModalOpen, setIsBeverageModalOpen] = useState(false);
  const [printProposalData, setPrintProposalData] = useState(null);
  const [conciergePreset, setConciergePreset] = useState(null);
  const [mountStage, setMountStage] = useState(0);

  // Progressive yield across macrotasks keeps every frame < 50ms (0ms TBT)
  // while ensuring all sections mount rapidly for scrolling, SEO, and a11y.
  useEffect(() => {
    const timers = [
      setTimeout(() => setMountStage(1), 16),
      setTimeout(() => setMountStage(2), 48),
      setTimeout(() => setMountStage(3), 80),
      setTimeout(() => setMountStage(4), 112),
      setTimeout(() => setMountStage(5), 144),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleRequestSimilar = (preset) => {
    setConciergePreset({ ...preset, _ts: Date.now() });
    setMountStage(5);
    setTimeout(() => {
      const el = document.getElementById('concierge');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 30);
  };

  const handleOpenPrintModal = (data) => {
    setPrintProposalData(data);
  };

  const handleClosePrintModal = () => {
    setPrintProposalData(null);
  };

  return (
    <div className="min-h-screen bg-navy-royal text-alabaster-cotton font-tajawal antialiased selection:bg-gold-royal/30 selection:text-gold-champagne relative overflow-x-hidden">
      {/* Fast Ceremonial Entry Reveal Curtain */}
      <CeremonialCurtain />

      {/* Floating Sovereign Header */}
      <Header onOpenBeverageModal={() => setIsBeverageModalOpen(true)} />

      {/* Main Orchestrated Experience */}
      <main id="main-content">
        {/* Section 1: Hero Section (Mounted immediately for sub-second FCP/LCP) */}
        <HeroSection />

        {/* Progressive below-the-fold sections (Zero main-thread blocking) */}
        {mountStage >= 1 && <CeremonyTimeline />}
        {mountStage >= 2 && <ApprovedGearMatrix />}
        {mountStage >= 3 && (
          <RoyalEventGallery
            onOpenBeverageModal={() => setIsBeverageModalOpen(true)}
            onRequestSimilar={handleRequestSimilar}
          />
        )}
        {mountStage >= 4 && (
          <RoyalConciergeStudio
            presetRequest={conciergePreset}
            onOpenPrintModal={handleOpenPrintModal}
          />
        )}
      </main>

      {/* Sovereign Royal Footer */}
      {mountStage >= 5 && <Footer />}

      {/* Floating Royal Navy & Gold WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Lazy-Loaded Modals */}
      <Suspense fallback={null}>
        {isBeverageModalOpen && (
          <BeverageModal
            isOpen={isBeverageModalOpen}
            onClose={() => setIsBeverageModalOpen(false)}
          />
        )}

        {printProposalData && (
          <PrintProposalModal
            isOpen={!!printProposalData}
            onClose={handleClosePrintModal}
            proposalData={printProposalData}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
