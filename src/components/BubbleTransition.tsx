import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BubbleTransitionProps {
  trigger: boolean;
  onComplete: () => void;
}

export const BubbleTransition: React.FC<BubbleTransitionProps> = ({ trigger, onComplete }) => {
  const curtainBubbles = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      size: Math.random() * 85 + 35,
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      duration: Math.random() * 0.6 + 0.8,
    }));
  }, []);

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Blue water wipe veil */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/85 via-[#0d47a1]/92 to-[#022c68]/98 origin-bottom backdrop-blur-md"
          />

          {/* Swarm of large bursting bubbles */}
          {curtainBubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: '110vh', scale: 0.3, opacity: 0 }}
              animate={{
                y: '-20vh',
                scale: [0.3, 1.4, 1.8, 0],
                opacity: [0, 1, 0.9, 0],
              }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                ease: 'easeOut',
              }}
              className="absolute rounded-full border-2 border-white bg-gradient-to-tr from-cyan-200/60 via-white/35 to-transparent shadow-[0_0_25px_rgba(0,229,255,0.75)] backdrop-blur-sm"
              style={{
                width: b.size,
                height: b.size,
                left: `${b.left}%`,
              }}
            >
              <div className="w-4 h-4 bg-white rounded-full ml-3 mt-3 blur-[1px]" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.12, 1, 0.9] }}
            transition={{ duration: 1.15, times: [0, 0.3, 0.7, 1] }}
            className="relative z-10 text-center px-4"
          >
            <span className="text-4xl sm:text-6xl font-black text-yellow-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] font-cartoon tracking-wider">
              🫧 DIVING DEEPER... 🫧
            </span>
            <p className="text-cyan-100 text-sm sm:text-lg font-bold mt-2 drop-shadow tracking-widest uppercase">
              Entering Bikini Bottom Waters
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
