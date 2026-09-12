import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { Compass, Sparkles,Play } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface IntroPageProps {
  onComplete: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blackCurtainRef = useRef<HTMLDivElement>(null);
  const bubbleSwarmRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Safely play sound on user gesture to unlock browser autoplay
  const startSequence = () => {
    soundFx.playBubblePop(1);
    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) return;

    const curtain = blackCurtainRef.current;
    const swarm = bubbleSwarmRef.current;
    const titleBox = titleBoxRef.current;
    const container = containerRef.current;

    if (!curtain || !swarm || !titleBox || !container) return;

    // Create 48 realistic glass bubbles with specular reflections
    const bubbles: HTMLDivElement[] = [];
    const count = 48;

    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      const size = 32 + Math.random() * 90;
      b.className = 'absolute rounded-full pointer-events-none';
      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.background =
        'radial-gradient(circle at 36% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(186, 230, 253, 0.28) 45%, rgba(14, 165, 233, 0.18) 75%, rgba(2, 132, 199, 0.35) 100%)';
      b.style.border = '1.2px solid rgba(255, 255, 255, 0.5)';
      b.style.boxShadow =
        '0 0 18px rgba(56, 189, 248, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.35)';
      b.style.backdropFilter = 'blur(2px)';

      // Specular curved gloss
      const specular = document.createElement('div');
      specular.style.position = 'absolute';
      specular.style.top = '15%';
      specular.style.left = '22%';
      specular.style.width = '26%';
      specular.style.height = '14%';
      specular.style.borderRadius = '9999px';
      specular.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
      specular.style.transform = 'rotate(-38deg)';
      b.appendChild(specular);

      swarm.appendChild(b);
      bubbles.push(b);
    }

    // GSAP Sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete();
      },
    });

    // Initial positioning
    tl.set(curtain, { opacity: 1, clipPath: 'circle(150% at 50% 50%)' });
    tl.set(titleBox, { opacity: 0, scale: 0.88, y: 15 });

    bubbles.forEach((b, idx) => {
      const startX = Math.random() * window.innerWidth;
      const startY =
        idx < 12 ? window.innerHeight + 60 : Math.random() * window.innerHeight;
      gsap.set(b, {
        x: startX,
        y: startY,
        scale: 0.15,
        opacity: 0,
      });
    });

    // 0.3s: Initial bubbles rise gently from bottom
    const initialWave = bubbles.slice(0, 12);
    tl.to(
      initialWave,
      {
        opacity: 0.9,
        scale: 1,
        y: '-=300',
        duration: 1.1,
        stagger: 0.07,
        ease: 'power1.out',
        onStart: () => soundFx.playBubblePop(0.9),
      },
      '+=0.2'
    );

    // 1.0s: Bubble swarm floods the screen
    const remainingBubbles = bubbles.slice(12);
    tl.to(
      remainingBubbles,
      {
        opacity: 0.95,
        scale: () => 0.8 + Math.random() * 0.9,
        x: (i) => `+=${Math.sin(i) * 110}`,
        y: () => `-=${180 + Math.random() * 320}`,
        duration: 1.2,
        stagger: {
          amount: 0.6,
          from: 'random',
        },
        ease: 'sine.inOut',
        onStart: () => {
          soundFx.playBubblePop(1.15);
          setTimeout(() => soundFx.playBubblePop(1.4), 220);
        },
      },
      '-=0.5'
    );

    // 1.3s: Elegant title card appears amidst the bubbles
    tl.to(
      titleBox,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        onStart: () => soundFx.playTreasureChime(),
      },
      '-=0.8'
    );

    // 2.2s: Bubble mask wipe
    tl.to(
      titleBox,
      {
        opacity: 0,
        scale: 1.08,
        y: -15,
        duration: 0.45,
        ease: 'power2.in',
      },
      '+=0.15'
    );

    tl.to(
      curtain,
      {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.85,
        ease: 'power3.inOut',
        onStart: () => {
          soundFx.playBubblePop(1.3);
        },
      },
      '-=0.3'
    );

    // Fade out swarm bubbles
    tl.to(
      swarm,
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    tl.to(container, {
      opacity: 0,
      duration: 0.3,
      ease: 'linear',
    });

    return () => {
      tl.kill();
      if (swarm) swarm.innerHTML = '';
    };
  }, [isStarted, onComplete]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDone(true);
    soundFx.playBubblePop(1.2);
    onComplete();
  };

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      onClick={!isStarted ? startSequence : undefined}
      className={`fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none ${
        !isStarted ? 'cursor-pointer' : ''
      }`}
    >
      {/* Black curtain */}
      <div ref={blackCurtainRef} className="absolute inset-0 bg-[#020b14]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#031526]/80 to-[#020b14]" />
      </div>

      {/* Autoplay prompt */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md px-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-pulse">
              <Play className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-cyan-100 tracking-wide font-sans uppercase mb-2">
              Ready For An UnderWater Adventure?
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-300/80 tracking-widest uppercase">
              click to start
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Swarm Layer */}
      <div
        ref={bubbleSwarmRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Title Card */}
      <div
        ref={titleBoxRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-200 text-xs font-mono font-medium tracking-[0.2em] uppercase backdrop-blur-xl mb-4 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <Compass className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
          <span>Undersea Hackathon 2026</span>
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 drop-shadow-[0_4px_30px_rgba(56,189,248,0.4)] uppercase font-sans">
          CODE QUEST
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-cyan-200/80 font-light tracking-[0.25em] uppercase mt-2 font-mono">
          Entering Bikini Bottom...
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-cyan-200 tracking-wider backdrop-blur-md cursor-pointer transition-all active:scale-95"
      >
        Skip Intro ➔
      </button>
    </div>
  );
};