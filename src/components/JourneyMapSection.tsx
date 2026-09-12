import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, MapPin, CheckCircle2, Clock, X } from 'lucide-react';
import { TimelineStop } from '../types';
import { soundFx } from '../utils/audio';

import krustyKrabImg from '../assets/images/krusty_krab_map.jpg';
import treedomeImg from '../assets/images/treedome_map.jpg';
import gloveWorldImg from '../assets/images/glove_world_map.jpg';
import chumBucketImg from '../assets/images/chum_bucket_map.jpg';

interface JourneyMapSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const JourneyMapSection: React.FC<JourneyMapSectionProps> = ({ onNavigateToSection }) => {
  const [activeStopId, setActiveStopId] = useState<number | null>(null);
  const [pinnedStopId, setPinnedStopId] = useState<number | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<TimelineStop | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const timelineStops: TimelineStop[] = [
    {
      id: 1,
      time: "Start Point",
      title: "The Krusty Krab",
      role: "Registration & Team Onboarding",
      character: "Mr. Krabs",
      avatar: "🦀",
      speech: "Ahoy, me money-makers! Check-in yer divers, grab yer secret pirate badges, and don't touch me dime!",
      artifact: "Secret Krabby Formula Map",
      badgeColor: "bg-red-500",
      bubbleBorder: "border-red-400/50",
      locationDetails: "Galley Counter #3, Poseidon Avenue, Bikini Bottom",
      image: krustyKrabImg,
      locationName: "The Krusty Krab"
    },
    {
      id: 2,
      time: "Almost Halfway",
      title: "Sandy's Treedome",
      role: "Online Qualifier & Idea Pitch",
      character: "Sandy Cheeks",
      avatar: "🐿️",
      speech: "Howdy partner! Solve questions lightning before the oxygen timer ticks!",
      artifact: "Sandy's Jetpack Rocket Specs",
      badgeColor: "bg-emerald-500",
      bubbleBorder: "border-emerald-400/50",
      locationDetails: "Pressurized Oak Tree Bio-Habitat, Sector 4",
      image: treedomeImg,
      locationName: "Sandy's Treedome"
    },
    {
      id: 3,
      time: "Semi Finals",
      title: "REGIONALS SHORTLISTING",
      role: "Shortlisting for the Regionals based on Preferences and Ranks",
      character: "SpongeBob & Patrick",
      avatar: "🧽",
      speech: "Fire up your coral laptops! hours of uninterrupted code, kelp shakes, and zero sleep!",
      artifact: "Regional Qualifier Clearance Pass",
      badgeColor: "bg-yellow-500",
      bubbleBorder: "border-yellow-400/50",
      locationDetails: "Regional Qualifier Nodes & Campus Venues",
      image: gloveWorldImg,
      locationName: "Regionals Shortlisting"
    },
    {
      id: 4,
      time: "Grand Finale",
      title: "FINALS SHORTLISTING",
      role: "Top 30 participants from each Regional Compete for the Championship FINALS",
      character: "",
      avatar: "🏆",
      speech: "The Ultimate Showdown at DJ Sanghvi, Mumbai",
      artifact: "National Championship Trophy Access",
      badgeColor: "bg-teal-600",
      bubbleBorder: "border-teal-400/50",
      locationDetails: "DJ Sanghvi College of Engineering, Mumbai",
      image: chumBucketImg,
      locationName: "DJ Sanghvi, Mumbai"
    }
  ];

  // Clean up any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleRowMouseEnter = (stopId: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (activeStopId !== stopId) {
      setActiveStopId(stopId);
      soundFx.playBubblePop(1.1);
    }
  };

  const handleRowMouseLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    // Graceful 250ms buffer prevents glitching when moving between bubble and card or across borders
    leaveTimerRef.current = setTimeout(() => {
      setActiveStopId(null);
    }, 250);
  };

  const handleBubbleToggleClick = (stop: TimelineStop) => {
    if (pinnedStopId === stop.id) {
      setPinnedStopId(null);
      setActiveStopId(null);
      soundFx.playBubblePop(0.9);
    } else {
      setPinnedStopId(stop.id);
      setActiveStopId(stop.id);
      soundFx.playBubblePop(1.2);
    }
  };

  const handleOpenArtifactModal = (stop: TimelineStop) => {
    setSelectedArtifact(stop);
    soundFx.playTreasureChime();
  };

  return (
    <section 
      id="journey"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#043e7d] via-[#005f73] to-[#022b42] text-white overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Banner */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-16 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 text-xs font-black uppercase tracking-widest backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-cyan-300" />
          <span>Coral Reef Expedition Trail</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 drop-shadow-lg font-cartoon">
          THE EXPEDITION SCHEDULE
        </h2>
        <p className="text-cyan-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Hover or click on any circular bubble along the squiggly undersea current to inspect stage schedules and speaker briefs!
        </p>
      </div>

      {/* Interactive Winding Squiggly Path Container */}
      <div className="relative max-w-4xl mx-auto z-20 min-h-[900px] py-10">
        {/* Squiggly SVG Guide Line (Curved and subtle opacity) */}
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <svg 
            className="w-full h-full max-w-2xl" 
            viewBox="0 0 400 1000" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Soft Glowing Under-layer */}
            <path
              d="M 200 0 C 130 130, 270 240, 200 360 C 130 480, 270 600, 200 720 C 140 820, 260 920, 200 1000"
              stroke="rgba(0, 229, 255, 0.15)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Delicate, Squiggly, Translucent Dashed Center Line */}
            <path
              d="M 200 0 C 130 130, 270 240, 200 360 C 130 480, 270 600, 200 720 C 140 820, 260 920, 200 1000"
              stroke="rgba(255, 235, 150, 0.3)"
              strokeWidth="3.5"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bubble Stations Array */}
        <div className="space-y-24 sm:space-y-28 relative">
          {timelineStops.map((stop, index) => {
            const isEven = index % 2 === 0;
            const isVisible = activeStopId === stop.id || pinnedStopId === stop.id;

            return (
              <div
                key={stop.id}
                onMouseEnter={() => handleRowMouseEnter(stop.id)}
                onMouseLeave={handleRowMouseLeave}
                className={`relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 p-2 rounded-3xl transition-colors ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 1. The Circular Bubble */}
                <div 
                  className="relative z-30 cursor-pointer select-none group"
                  onClick={() => handleBubbleToggleClick(stop)}
                  title="Hover or click to inspect stage details!"
                >
                  {/* Outer iridescent aura on hover/pinned */}
                  <motion.div 
                    animate={{
                      scale: isVisible ? 1.08 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-40 h-40 sm:w-52 sm:h-52 rounded-full relative p-2 flex flex-col items-center justify-end text-center transition-all duration-300 overflow-hidden ${
                      isVisible 
                        ? 'border-4 border-yellow-300 shadow-[0_0_50px_rgba(250,204,21,0.65)] ring-4 ring-cyan-400/30' 
                        : 'border-3 border-white/60 shadow-[0_0_30px_rgba(0,229,255,0.35)] hover:border-yellow-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.45)]'
                    } backdrop-blur-xl`}
                  >
                    {/* Location Image Backdrop */}
                    <img 
                      src={stop.image}
                      alt={stop.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shading for high contrast text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20" />

                    {/* Glossy Specular Highlights */}
                    <div className="absolute top-2.5 left-4 w-9 h-4.5 bg-white/40 rounded-full blur-[0.8px] -rotate-45 pointer-events-none" />
                    <div className="absolute bottom-3 right-5 w-3 h-3 bg-white/30 rounded-full blur-[0.5px] pointer-events-none" />

                    {/* Compact Stage Identifier & Location Title */}
                    <div className="relative z-10 w-full px-2 pb-1.5 flex flex-col items-center">
                      <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-yellow-300 uppercase block drop-shadow-md">
                        STAGE 0{stop.id}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white font-cartoon block truncate max-w-[140px] drop-shadow-md">
                        {stop.title}
                      </span>

                      {/* Status Chip */}
                      <div className="mt-1">
                        <span className={`text-[9px] font-bold tracking-wide px-2.5 py-0.5 rounded-full flex items-center gap-1 justify-center shadow-sm ${
                          isVisible ? 'bg-yellow-400 text-slate-950 font-black' : 'bg-slate-900/80 text-cyan-200 border border-cyan-400/30 backdrop-blur-sm'
                        }`}>
                          <span>🫧</span>
                          <span>{isVisible ? (pinnedStopId === stop.id ? 'Pinned' : 'Active') : 'Hover / Tap'}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 2. Detail Content Box with Zero-Gap Hover Area */}
                <div className="w-full md:w-84 lg:w-96 min-h-[160px] flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    {isVisible && (
                      <motion.div
                        key={`card-${stop.id}`}
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 6 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`w-full p-4 sm:p-5 rounded-3xl bg-slate-950/95 border-2 ${stop.bubbleBorder} shadow-2xl backdrop-blur-2xl relative z-40 text-left`}
                      >
                        {/* Header: Time & Stage */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-black text-slate-950 shadow-sm font-mono flex items-center gap-1 ${stop.badgeColor}`}>
                            <Clock className="w-3 h-3 inline" />
                            <span>{stop.time}</span>
                          </span>
                          <span className="text-[11px] font-mono font-bold text-cyan-300">
                            STAGE 0{stop.id}
                          </span>
                        </div>

                        {/* Location Preview Banner */}
                        <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden mb-2.5 border border-white/20 shadow-md">
                          <img 
                            src={stop.image}
                            alt={stop.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                            <span className="text-xs font-bold text-yellow-300 font-cartoon drop-shadow">
                              📍 {stop.locationName || stop.title}
                            </span>
                            {stop.character ? (
                              <span className="text-[10px] font-mono text-cyan-200 bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-400/30">
                                {stop.character}
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-yellow-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                                Final Showdown
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Role */}
                        <h3 className="text-lg sm:text-xl font-black text-white font-cartoon">
                          {stop.title}
                        </h3>
                        <p className="text-xs uppercase font-bold tracking-wider text-yellow-400 mt-0.5">
                          {stop.role}
                        </p>

                        {/* Character Speech Dialogue Box */}
                        <div className="mt-2.5 p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-100 text-xs sm:text-sm leading-relaxed">
                          {stop.character ? (
                            <>
                              <span className="font-bold not-italic text-yellow-300 text-xs block mb-1 font-cartoon">
                                {stop.character} shouts:
                              </span>
                              <span className="italic">&ldquo;{stop.speech}&rdquo;</span>
                            </>
                          ) : (
                            <div className="font-bold text-yellow-300 text-xs sm:text-sm font-cartoon flex items-center gap-1.5">
                              <span>🏆</span>
                              <span>{stop.speech}</span>
                            </div>
                          )}
                        </div>

                        {/* Milestone Artifact clickable trigger */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenArtifactModal(stop);
                          }}
                          className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-cyan-200 font-semibold cursor-pointer hover:text-yellow-300 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Milestone Artifact:</span>
                          </span>
                          <span className="text-yellow-300 font-mono underline decoration-dotted">
                            ⚓ {stop.artifact}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gentle idle indicator when unhovered to maintain visual stability */}
                  {!isVisible && (
                    <div className="hidden md:flex items-center gap-2 text-cyan-300/50 text-xs font-mono select-none pl-4">
                      <span className="w-2 h-2 rounded-full bg-cyan-400/50 animate-ping" />
                      <span>Hover bubble for stage brief...</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artifact Inspect Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-md w-full rounded-3xl p-6 bg-gradient-to-b from-cyan-950 to-slate-950 border-2 border-yellow-400 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-yellow-400 uppercase tracking-wider block">
                  STAGE 0{selectedArtifact.id} CHECKPOINT
                </span>
                <h4 className="text-xl font-black text-white font-cartoon">
                  {selectedArtifact.title}
                </h4>
                <p className="text-xs text-cyan-200">{selectedArtifact.artifact}</p>
              </div>
              <button 
                onClick={() => setSelectedArtifact(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Location Image Feature in Modal */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden my-3.5 border-2 border-yellow-400/40 shadow-inner">
              <img 
                src={selectedArtifact.image}
                alt={selectedArtifact.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-cartoon">
                  📍 {selectedArtifact.locationName || selectedArtifact.title}
                </span>
                {selectedArtifact.character ? (
                  <span className="text-[10px] font-mono text-yellow-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                    {selectedArtifact.character}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-yellow-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                    Final Showdown
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm text-cyan-100">
              <div className="bg-cyan-900/60 p-3 rounded-xl border border-cyan-400/20">
                {selectedArtifact.character ? (
                  <p className="italic">&ldquo;{selectedArtifact.speech}&rdquo;</p>
                ) : (
                  <p className="font-bold text-yellow-300 font-cartoon flex items-center gap-1.5">
                    <span>🏆</span>
                    <span>{selectedArtifact.speech}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{selectedArtifact.locationDetails}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Checkpoint Unlocks Access to Hackathon Swag & Repos</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedArtifact(null)}
              className="mt-6 w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm tracking-wide cursor-pointer transition-colors"
            >
              Close Checkpoint
            </button>
          </div>
        </div>
      )}

      {/* Dive Indicator to Prizes */}
      <div 
        onClick={() => onNavigateToSection('prizes')}
        className="relative z-20 mx-auto text-center cursor-pointer group pt-16"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-200 mb-1 block group-hover:text-yellow-300 transition-colors">
          Dive To The Abyssal Pirate Treasure Vault
        </span>
        <ChevronDown className="w-6 h-6 mx-auto text-yellow-300 animate-bounce" />
      </div>
    </section>
  );
};
