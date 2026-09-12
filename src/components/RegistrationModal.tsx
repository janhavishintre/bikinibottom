import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Sparkles, Award, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegistrationData, HackathonTrack } from '../types';
import { soundFx } from '../utils/audio';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    teamName: '',
    leaderName: '',
    email: '',
    teamSize: 3,
    track: 'Oceanic AI & Marine Vision',
    experienceLevel: 'Intermediate Diver',
    dietaryPreference: 'Krabby Patties (All Veg & Non-Veg)',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [diverPassId, setDiverPassId] = useState('');

  const tracks: HackathonTrack[] = [
    'Oceanic AI & Marine Vision',
    'Decentralized Kelp & Web3',
    'Sandy’s Bio-Dome Rocketry',
    'Hydrodynamic DevTools'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passCode = `BB-${Math.floor(1000 + Math.random() * 9000)}-${formData.track.slice(0, 3).toUpperCase()}`;
    setDiverPassId(passCode);
    setIsSubmitted(true);
    soundFx.playTreasureChime();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#00e5ff', '#38bdf8', '#ff70a6']
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-cyan-950 via-slate-900 to-[#000814] border-2 border-yellow-400/80 shadow-[0_0_50px_rgba(0,229,255,0.3)] p-6 sm:p-8 text-white my-8 overflow-hidden"
          >
            {/* Background glowing rings */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="text-left space-y-1 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>OFFICIAL HACKER CREW ONBOARDING</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-cartoon">
                    Bikini Bottom Registration
                  </h3>
                  <p className="text-xs text-cyan-200">
                    Dive in with your team for 24 hours of undersea innovation!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                      Crew / Team Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="e.g. The Hydrodynamic Spatulas"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-slate-400 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                        Lead Diver Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.leaderName}
                        onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                        placeholder="e.g. Sandy SquarePants"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-slate-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="diver@bikinibottom.ocean"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none text-white placeholder-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                        Team Size (2-4)
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/20 focus:border-yellow-400 focus:outline-none text-white text-sm"
                      >
                        <option value={2}>2 Divers (Duo)</option>
                        <option value={3}>3 Divers (Trio)</option>
                        <option value={4}>4 Divers (Full Squad)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                        Selected Track
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/20 focus:border-yellow-400 focus:outline-none text-white text-sm truncate"
                      >
                        {tracks.map((t, idx) => (
                          <option key={idx} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-xs text-yellow-200 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>Free registration sponsored by Krusty Krab. Includes 24h Wi-Fi, unlimited Kelp Shakes, and physical participant kits!</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-[0_4px_20px_rgba(250,204,21,0.4)] cursor-pointer transition-all active:scale-98"
                  >
                    CONFIRM DIVE REGISTRATION 🫧
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 border-2 border-green-400 text-green-300 flex items-center justify-center mx-auto text-3xl">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-yellow-300 font-cartoon">
                    You Are Officially Ready!
                  </h3>
                  <p className="text-xs text-cyan-200 mt-1">
                    Welcome aboard the 2026 Undersea Expedition Crew.
                  </p>
                </div>

                {/* Personalized Diver Badge Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-cyan-900/60 to-slate-950 border-2 border-yellow-400/70 text-left relative overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2.5 mb-3">
                    <span className="text-xs font-mono font-bold text-yellow-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-yellow-300" /> OFFICIAL DIVER PASS
                    </span>
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      {diverPassId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-slate-400 font-mono">CREW NAME:</p>
                      <p className="text-white font-black text-sm">{formData.teamName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono">LEAD DIVER:</p>
                      <p className="text-white font-bold">{formData.leaderName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono">CREW SIZE:</p>
                      <p className="text-white font-bold">{formData.teamSize} Divers</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-mono">EXPEDITION TRACK:</p>
                      <p className="text-yellow-300 font-bold truncate">{formData.track}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-300 font-mono">
                    <span>STATUS: APPROVED 🤿</span>
                    <span>CHECK-IN: KRUSTY KRAB 🦀</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm cursor-pointer transition-colors"
                >
                  Return to Surface
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
