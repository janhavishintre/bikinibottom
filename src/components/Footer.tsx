import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);
  const [discordNotice, setDiscordNotice] = useState(false);

  return (
    <footer className="relative w-full py-16 px-6 lg:px-16 bg-[#000814] text-white border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
              🍍
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-cartoon">
              Bikini Bottom CODE UNCODE 2026
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            India&apos;s premiere ICPC-Style Competition. Powered by student developers, seaweed snacks, and endless questions.
          </p>
        </div>

        {/* Quick Section Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-300">
          <button 
            onClick={() => onNavigateToSection('hero')} 
            className="hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Surface
          </button>
          <button 
            onClick={() => onNavigateToSection('journey')} 
            className="hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Roadmap
          </button>
          <button 
            onClick={() => onNavigateToSection('prizes')} 
            className="hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Prize Vault
          </button>
          <button 
            onClick={() => setDiscordNotice(true)} 
            className="hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Discord Channel
          </button>
          <button 
            onClick={() => setShowCodeOfConduct(true)} 
            className="hover:text-yellow-300 transition-colors cursor-pointer"
          >
            Code of Conduct
          </button>
        </div>

        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>© 2026 Bikini Bottom Tech Council.</p>
          <p className="mt-1">Crafted with 🫧 and passion for collegiate builders.</p>
        </div>
      </div>

      {/* Code of Conduct Modal */}
      {showCodeOfConduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-lg w-full rounded-3xl p-6 bg-slate-900 border-2 border-cyan-400/50 shadow-2xl text-left text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-yellow-400" />
                <h4 className="text-lg font-black text-yellow-300 font-cartoon">
                  Bikini Bottom Code of Conduct
                </h4>
              </div>
              <button 
                onClick={() => setShowCodeOfConduct(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>1. Respect All Divers:</strong> Whether starfish, sea sponge, cephalopod, or squirrel in an astronaut helmet, all builders are welcomed with kindness and collegiality.
              </p>
              <p>
                <strong>2. Plagiarism & Formula Protection:</strong> Never attempt to steal the Krabby Patty Secret Formula or tamper with your peers&apos; GitHub repositories.
              </p>
              <p>
                <strong>3. Fair Play & Fun:</strong> 24 hours of friendly, energetic prototyping. Mentors from Sandy&apos;s Treedom and the Krusty Krab will be available throughout.
              </p>
            </div>
            <button
              onClick={() => setShowCodeOfConduct(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs cursor-pointer"
            >
              Aye Aye, Captain!
            </button>
          </div>
        </div>
      )}

      {/* Discord Channel Notice Modal */}
      {discordNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-sm w-full rounded-3xl p-6 bg-slate-900 border-2 border-indigo-400/50 shadow-2xl text-center text-white">
            <div className="text-4xl mb-2">💬</div>
            <h4 className="text-lg font-black text-indigo-300 font-cartoon">
              Undersea Discord Server
            </h4>
            <p className="text-xs text-slate-300 mt-2">
              Connect with 1,200+ divers, form teams, and meet mentors in #conch-street-terminal!
            </p>
            <div className="mt-4 p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 font-mono text-xs text-indigo-200">
              discord.gg/bikinibottom-codeathon
            </div>
            <button
              onClick={() => setDiscordNotice(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs cursor-pointer"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
