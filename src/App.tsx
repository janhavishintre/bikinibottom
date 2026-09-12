/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FloatingBubbles } from './components/FloatingBubbles';
import { BubbleTransition } from './components/BubbleTransition';
import { IntroPage } from './components/IntroPage';
import { HeroSection } from './components/HeroSection';
import { JourneyMapSection } from './components/JourneyMapSection';
import { PrizesSection } from './components/PrizesSection';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';
import { soundFx } from './utils/audio';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isBubbleTransitioning, setIsBubbleTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    soundFx.playBubblePop(1.1);
    setTargetSection(sectionId);
    setIsBubbleTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsBubbleTransitioning(false);
  };

  const handleOpenRegister = () => {
    soundFx.playBubblePop(1.3);
    setIsRegisterOpen(true);
  };

  return (
    <main className="min-h-screen w-full bg-[#00b4d8] text-white font-sans antialiased selection:bg-yellow-300 selection:text-slate-900 relative">
      {/* 0. Full-Screen Animated Opening Sequence directly revealing Bikini Bottom */}
      {showIntro && (
        <IntroPage onComplete={() => setShowIntro(false)} />
      )}

      {/* 1. Global Ambient Floating Bubbles Particle Layer */}
      <FloatingBubbles count={35} />

      {/* 2. Curtain Bubble Transition Swarm */}
      <BubbleTransition 
        trigger={isBubbleTransitioning} 
        onComplete={handleTransitionComplete} 
      />

      {/* 3. Section 1: Hero Parallax Seascape (Bikini Bottom Page) */}
      <HeroSection 
        onNavigateToSection={handleNavigate}
        onOpenRegister={handleOpenRegister}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* 4. Section 2: Journey Map / Schedule with Speech Bubbles */}
      <JourneyMapSection 
        onNavigateToSection={handleNavigate} 
      />

      {/* 5. Section 3: Prizes Abyssal Pirate Vault */}
      <PrizesSection 
        onOpenRegister={handleOpenRegister}
        onNavigateToSection={handleNavigate}
      />

      {/* 6. Undersea Footer */}
      <Footer 
        onNavigateToSection={handleNavigate} 
      />

      {/* 7. Registration Modal */}
      <RegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
      />
    </main>
  );
}
