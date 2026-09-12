import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Waves, Pause, Play, SkipForward } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

import spongebobTrophyImg from '../assets/images/spongebob_trophy.png';
import patrickTrophyImg from '../assets/images/patrick_trophy.png';
import squidwardTrophyImg from '../assets/images/squidward_trophy.png';
import mrKrabsMoneyImg from '../assets/images/mr_krabs_money.png';
import prizesBgImg from '../assets/images/prizes_bg.jpg';

interface PrizesSectionProps {
  onOpenRegister: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

interface TrophyData {
  place: string;
  rankCode: string;
  amount: string;
  title: string;
  trophyName: string;
  character: string;
  imgSrc: string;
  isGrand?: boolean;
  perks: string[];
}

export const PrizesSection: React.FC<PrizesSectionProps> = ({ 
  onNavigateToSection 
}) => {
  const [, setSelectedTrophy] = useState<TrophyData | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [, setKrabsQuote] = useState<string | null>(null);

  const trophies: TrophyData[] = [
    {
      place: "2ND",
      rankCode: "2ND PLACE",
      amount: "₹ 30,000",
      character: "Patrick Star",
      title: "Bikini Bottom Runner-Up",
      trophyName: "The Silver Krabby Patty Cup 2nd Place",
      imgSrc: patrickTrophyImg,
      perks: [
        "₹30,000 Hard Cash Bounty",
        "Fast-Track Interview with Undersea VCs",
        "Kelp Shake Swag Box & Enamel Pins",
        "$500 USD Cloud Hosting Credits",
        "Patrick Star Engraved Silver Chalice"
      ]
    },
    {
      place: "1ST",
      rankCode: "1ST PLACE",
      amount: "₹ 50,000",
      character: "SpongeBob SquarePants",
      title: "Grand Bikini Bottom Champions",
      trophyName: "The Golden Krabby Patty Cup (Grand Champion)",
      imgSrc: spongebobTrophyImg,
      isGrand: true,
      perks: [
        "₹50,000 Hard Cash Bounty",
        "Direct Sponsor Internship Placement",
        "Handcrafted 24K Gold Pineapple Cup Trophy",
        "Lifetime VIP Passes to Krusty Krab Tech Gala",
        "$1,500 USD Cloud Credits + Senior Mentorship"
      ]
    },
    {
      place: "3RD",
      rankCode: "3RD PLACE",
      amount: "₹ 20,000",
      character: "Squidward Tentacles",
      title: "Bikini Bottom Honorable Mention",
      trophyName: "The Antique Bronze Krabby Patty Cup 3rd Place",
      imgSrc: squidwardTrophyImg,
      perks: [
        "₹20,000 Hard Cash Bounty",
        "1-on-1 Senior Tech Mentorship Session",
        "Undersea Hacker Hoodie & Clarinet Sticker Kit",
        "$250 USD Cloud Hosting Credits",
        "Squidward Engraved Bronze Chalice"
      ]
    }
  ];

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

  const handleTrophyClick = (trophy: TrophyData) => {
    soundFx.playTreasureChime();
    confetti({
      particleCount: trophy.isGrand ? 120 : 80,
      spread: trophy.isGrand ? 100 : 70,
      origin: { y: 0.6 },
      colors: trophy.isGrand 
        ? ['#70e000', '#ffd700', '#ffffff', '#38bdf8'] 
        : ['#70e000', '#e2e8f0', '#fbbf24']
    });
    setSelectedTrophy(trophy);
  };

  const handleKrabsClick = () => {
    soundFx.playTreasureChime();
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { x: 0.5, y: 0.75 },
      colors: ['#70e000', '#22c55e', '#ffd700', '#ffffff', '#10b981']
    });
    const quotes = [
      "Money, money, money! ₹1,00,000 in total bounties! Argh-argh-argh!",
      "I smell the sweet scent of cold hard cash and victory!",
      "First prize is 50,000 smackers! Code yer heart out!",
      "The sweetest melody in Bikini Bottom... CHA-CHING!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setKrabsQuote(randomQuote);
  };

  return (
    <section 
      id="prizes"
      className="relative min-h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-8 lg:px-16 text-white overflow-hidden select-none"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={prizesBgImg} 
          alt="Bikini Bottom Undersea Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950/60 pointer-events-none" />
      </div>

      {/* TOP BAR */}
      <header className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between py-2 gap-4">
        {/* Top-Left Audio Pill */}
        <div 
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/80 border border-white/20 backdrop-blur-md cursor-pointer transition-all shadow-md group"
          title="Toggle Ambient Audio"
        >
          <div className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400">
            <Waves className={`w-3 h-3 ${isPlayingAudio ? 'animate-spin-slow' : ''}`} />
          </div>
          <div className="text-left hidden xs:block">
            <span className="text-[10px] font-mono font-bold text-white group-hover:text-lime-300 transition-colors">
              DEFAULT T...
            </span>
            <p className="text-[8px] font-mono text-lime-400 -mt-0.5">Kanto Region</p>
          </div>
          <div className="flex items-center gap-1 pl-1 border-l border-white/15">
            <button 
              type="button" 
              className="p-0.5 text-slate-300 hover:text-white transition-colors"
              aria-label="Play/Pause"
            >
              {isPlayingAudio ? <Pause className="w-3 h-3 fill-current text-lime-400" /> : <Play className="w-3 h-3 fill-current" />}
            </button>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); soundFx.playSonarPing(); }}
              className="p-0.5 text-slate-300 hover:text-lime-300 transition-colors"
              title="Sonar Ping"
              aria-label="Skip / Ping"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Top-Right Pill Button */}
        <button 
          id="nav-back-roadmap"
          onClick={() => onNavigateToSection ? onNavigateToSection('journey') : window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-4 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/80 border border-white/20 text-xs font-bold text-white backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:border-lime-400/60"
        >
          <span>←</span>
          <span>Starter Selection</span>
        </button>
      </header>

      {/* TITLE: PRIZES */}
      <div className="relative z-20 text-center my-2">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-wider text-[#70e000] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] font-cartoon uppercase select-none"
        >
          PRIZES
        </motion.h2>
      </div>

      {/* 3 TROPHIES GRID + MR KRABS BELOW */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 my-auto flex flex-col items-center">
        {/* 3 Trophies Row */}
        <div className="max-w-5xl w-full grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 items-end justify-center">
          {trophies.map((trophy, idx) => (
            <motion.div
              key={trophy.place}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className={`flex flex-col items-center cursor-pointer group select-none ${
                trophy.isGrand ? '-mt-6 sm:-mt-10' : ''
              }`}
              onClick={() => handleTrophyClick(trophy)}
              title={`Click ${trophy.place} place trophy (${trophy.character}) to inspect!`}
            >
              <motion.div 
                whileHover={{ scale: 1.07, y: -6 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center justify-center transition-all duration-300"
              >
                <div className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-85 ${
                  trophy.isGrand ? 'bg-yellow-400/40' : 'bg-cyan-400/30'
                }`} />

                <img
                  src={trophy.imgSrc}
                  alt={`${trophy.place} place trophy - ${trophy.trophyName}`}
                  referrerPolicy="no-referrer"
                  className={`w-auto object-contain transition-all duration-300 filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.85)] group-hover:brightness-110 ${
                    trophy.isGrand 
                      ? 'h-48 sm:h-64 md:h-76 lg:h-[360px]' 
                      : 'h-40 sm:h-56 md:h-64 lg:h-[300px]'
                  }`}
                />
              </motion.div>

              <div className="text-center mt-3 sm:mt-4 space-y-0.5">
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-[#70e000] tracking-wider font-cartoon drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {trophy.place}
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-[#70e000] tracking-wide font-cartoon drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {trophy.amount}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mr. Krabs Positioned Below Trophies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-col items-center justify-center cursor-pointer group select-none relative z-30"
          onClick={handleKrabsClick}
          title="Click Mr. Krabs to hear him count the cash!"
        >
          <div className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 font-bold text-xs sm:text-sm mb-2 shadow-lg backdrop-blur-md flex items-center gap-1.5">
            <span>💰</span>
            <span>₹1,00,000 Hard Cash Pool</span>
          </div>

          <img 
            src={mrKrabsMoneyImg} 
            alt="Mr Krabs with Money"
            referrerPolicy="no-referrer"
            className="w-44 sm:w-56 md:w-64 lg:w-72 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-200"
          />
        </motion.div>
      </div>
    </section>
  );
};