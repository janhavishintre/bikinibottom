import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, ChevronDown, Play, Pause, SkipForward, Waves
} from 'lucide-react';
import { FlowerClouds } from './FlowerClouds';
import { soundFx } from '../utils/audio';

import spongebobHeroImg from '../assets/images/spongebob_hero.png';
import patrickHeroImg from '../assets/images/patrick_hero.png';
import squidwardHeroImg from '../assets/images/squidward_hero.png';
import sandyHeroImg from '../assets/images/sandy_hero.png';

interface HeroSectionProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenRegister: () => void;
  onReplayIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigateToSection, 
  onOpenRegister,
  onReplayIntro
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);
  const [activeCharName, setActiveCharName] = useState<string | null>(null);

  const toggleSound = () => {
    const nextState = !isPlayingAudio;
    setIsPlayingAudio(nextState);
    soundFx.toggleBgm(nextState);
    if (nextState) {
      soundFx.playTreasureChime();
    } else {
      soundFx.playBubblePop(0.8);
    }
  };

  const handleCharClick = (name: string, quote: string, pitch = 1.2) => {
    soundFx.playBubblePop(pitch);
    setActiveCharName(name);
    setActiveSpeech(quote);
    setTimeout(() => {
      setActiveSpeech(null);
      setActiveCharName(null);
    }, 4500);
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#00b4d8] via-[#0096c7] to-[#043e7d] text-white pt-4 pb-0 px-4 sm:px-8 lg:px-16"
    >
      <FlowerClouds />

      {/* Underwater Caustics & Sunbeam Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100/70 via-cyan-200/20 to-transparent mix-blend-overlay" />

      {/* TOP BAR */}
      <header className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between py-2 gap-4">
        {/* Top-Left: Retro Music Player Pill */}
        <div className="flex items-center gap-2">
          <div 
            onClick={toggleSound}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/80 border border-white/20 backdrop-blur-md cursor-pointer transition-all shadow-md group"
            title="Toggle Undersea Ambient Soundtrack"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300">
              <Waves className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-spin-slow text-yellow-300' : ''}`} />
            </div>
            <div className="text-left hidden xs:block">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white group-hover:text-yellow-300 transition-colors">
                <span>UNDERWATER BGM...</span>
              </div>
              <p className="text-[9px] font-mono text-cyan-300 -mt-0.5">Pacific Reef FM</p>
            </div>
            <div className="flex items-center gap-1 pl-1 border-l border-white/15">
              <button 
                type="button" 
                className="p-1 text-slate-300 hover:text-white transition-colors"
                aria-label="Play/Pause music"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current text-yellow-400" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); soundFx.playSonarPing(); }}
                className="p-1 text-slate-300 hover:text-cyan-300 transition-colors"
                title="Sonar Ping SFX"
                aria-label="Sonar sound effect"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Top-Right: Pill Navigation Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onReplayIntro && (
            <button 
              id="nav-replay-intro"
              onClick={onReplayIntro}
              title="Replay Opening Sequence"
              className="px-3 py-1.5 rounded-full bg-slate-950/50 hover:bg-slate-950/75 border border-cyan-400/30 text-xs font-mono text-cyan-200 backdrop-blur-md transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>🫧</span>
              <span className="hidden sm:inline">Intro</span>
            </button>
          )}

          <button 
            id="nav-roadmap-pill"
            onClick={() => onNavigateToSection('journey')}
            className="px-3.5 py-1.5 rounded-full bg-slate-950/50 hover:bg-slate-950/75 border border-white/20 text-xs font-bold text-cyan-100 backdrop-blur-md transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Coral Roadmap</span>
          </button>

          <button 
            id="nav-prizes-pill"
            onClick={() => onNavigateToSection('prizes')}
            className="px-3.5 py-1.5 rounded-full bg-slate-950/50 hover:bg-slate-950/75 border border-white/20 text-xs font-bold text-yellow-300 backdrop-blur-md transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>💰</span>
            <span className="hidden sm:inline">Pirate Bounty</span>
          </button>

          <button 
            id="nav-register-top-pill"
            onClick={onOpenRegister}
            className="px-4 py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs border border-yellow-200 shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>← Join Crew</span>
          </button>
        </div>
      </header>

      {/* CENTERED HERO CONTENT */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-center my-auto pt-4 pb-2 flex flex-col items-center">
        {/* Presenter / Host Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">🍍</span>
            <span className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-cyan-100 uppercase drop-shadow font-cartoon">
              Krusty Krab & DJS CODE STARS
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-cyan-200/90 uppercase mt-0.5">
            P R E S E N T S
          </span>
        </motion.div>

        {/* Big Centered Title Block with "CODE UNCODE 2026" on ONE LINE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative my-2 select-none w-full px-2"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] font-cartoon">
            BIKINI BOTTOM
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 flex-nowrap w-full">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 drop-shadow-[0_6px_20px_rgba(250,204,21,0.5)] font-cartoon whitespace-nowrap">
              CODE UNCODE
            </span>
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 shrink-0 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 border-2 sm:border-4 border-white shadow-[0_0_25px_rgba(250,204,21,0.7)] flex items-center justify-center text-lg sm:text-2xl md:text-3xl animate-bounce">
              🍔
            </div>
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wide text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)] font-cartoon whitespace-nowrap">
              2026
            </span>
          </div>
        </motion.div>

        {/* Highlight Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 border border-yellow-300/40 backdrop-blur-md">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-wide text-yellow-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-cartoon uppercase">
              India&apos;s Premier ICPC-Style Competition
            </h2>
          </div>
        </motion.div>

        {/* Centered Descriptive Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl font-bold text-cyan-50 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going Intercity! Regional qualifiers across multiple colleges will lead to an electrifying grand finale in Mumbai
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button 
            id="hero-center-register-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenRegister}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-lg border-2 border-yellow-200 shadow-[0_8px_30px_rgba(250,204,21,0.5)] flex items-center gap-3 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-950 text-yellow-400 text-xs font-mono">FREE</span>
          </motion.button>

          <motion.button 
            id="hero-center-lagoon-btn"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigateToSection('journey')}
            className="px-7 py-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-950/80 border-2 border-cyan-300/40 text-cyan-100 font-extrabold text-lg backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-cyan-300" />
            <span>Expedition Trail</span>
          </motion.button>
        </motion.div>

        {/* Feature Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-4"
        >
          {[
            { label: 'Non-Stop', icon: '⏱️' },
            { label: 'Teams 2–4 Divers', icon: '🤿' },
            { label: '₹1,00,000+ Prize Bounty', icon: '💰' },
            { label: 'Free Krabby Patties', icon: '🍔' },
          ].map((badge, idx) => (
            <span 
              key={idx} 
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/40 border border-white/20 text-xs font-bold text-cyan-100 backdrop-blur-md shadow-sm"
            >
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </span>
          ))}
        </motion.div>

        {/* Live speech bubble */}
        {activeSpeech && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 px-5 py-2.5 rounded-2xl bg-slate-950/85 border-2 border-yellow-400 text-yellow-300 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md animate-bounce"
          >
            <span className="font-cartoon uppercase text-cyan-300 mr-2">[{activeCharName}]:</span>
            &ldquo;{activeSpeech}&rdquo;
          </motion.div>
        )}
      </div>

      {/* BOTTOM SEABED SCENERY */}
      <div className="relative z-20 w-full mt-auto pt-6 pb-3">
        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 flex items-end justify-between relative">
            {/* Patrick */}
            <motion.div 
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharClick('Patrick', 'Is mayonnaise an instrument for machine learning?')}
              className="flex flex-col items-center cursor-pointer group select-none relative z-10"
              title="Click Patrick to hear him!"
            >
              <div className="px-2.5 py-0.5 rounded-full bg-pink-500/90 border border-pink-300/40 text-white font-bold text-[10px] sm:text-xs mb-1 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md pointer-events-none">
                ⭐ Patrick Star
              </div>
              <img 
                src={patrickHeroImg}
                alt="Patrick Star"
                referrerPolicy="no-referrer"
                className="w-16 h-20 xs:w-20 xs:h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-200"
              />
            </motion.div>

            {/* SpongeBob */}
            <motion.div 
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharClick('SpongeBob', 'I’m ready! I’m ready! Pushing production commits to the coral main branch!')}
              className="flex flex-col items-center cursor-pointer group select-none relative z-10"
              title="Click SpongeBob to hear him!"
            >
              <div className="px-2.5 py-0.5 rounded-full bg-yellow-400 border border-yellow-200 text-slate-950 font-black text-[10px] sm:text-xs mb-1 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md pointer-events-none">
                🧽 SpongeBob
              </div>
              <img 
                src={spongebobHeroImg}
                alt="SpongeBob SquarePants"
                referrerPolicy="no-referrer"
                className="w-16 h-20 xs:w-20 xs:h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-200"
              />
            </motion.div>

            {/* BB Scroll Button */}
            <div className="flex flex-col items-center justify-center z-30 pb-1">
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigateToSection('journey')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0077b6] to-[#00b4d8] border-3 border-white shadow-[0_0_25px_rgba(0,229,255,0.7)] flex items-center justify-center text-white font-black text-sm sm:text-base font-cartoon cursor-pointer hover:border-yellow-300 transition-colors"
                title="Dive down to Expedition Trail"
              >
                <span>BB</span>
              </motion.button>
              <ChevronDown className="w-4 h-4 text-yellow-300 animate-bounce mt-0.5" />
            </div>

            {/* Squidward */}
            <motion.div 
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharClick('Squidward', 'Will you please stop testing in production? I am composing art!')}
              className="flex flex-col items-center cursor-pointer group select-none relative z-10"
              title="Click Squidward to hear him!"
            >
              <div className="px-2.5 py-0.5 rounded-full bg-cyan-600 border border-cyan-400/40 text-white font-bold text-[10px] sm:text-xs mb-1 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md pointer-events-none">
                🎷 Squidward
              </div>
              <img 
                src={squidwardHeroImg}
                alt="Squidward Tentacles"
                referrerPolicy="no-referrer"
                className="w-14 h-22 xs:w-18 xs:h-26 sm:w-24 sm:h-34 md:w-28 md:h-38 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-200"
              />
            </motion.div>

            {/* Sandy */}
            <motion.div 
              whileHover={{ scale: 1.12, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCharClick('Sandy Cheeks', 'Howdy! My algorithms run faster than a Texas jackrabbit in July!')}
              className="flex flex-col items-center cursor-pointer group select-none relative z-10"
              title="Click Sandy to hear her!"
            >
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-500 border border-emerald-300/40 text-white font-bold text-[10px] sm:text-xs mb-1 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-md pointer-events-none">
                🐿️ Sandy Cheeks
              </div>
              <img 
                src={sandyHeroImg}
                alt="Sandy Cheeks"
                referrerPolicy="no-referrer"
                className="w-16 h-20 xs:w-20 xs:h-24 sm:w-28 sm:h-32 md:w-30 md:h-36 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-200"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};