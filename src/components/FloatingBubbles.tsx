import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';

interface FloatingBubblesProps {
  count?: number;
}

export const FloatingBubbles: React.FC<FloatingBubblesProps> = ({ count = 32 }) => {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 24 + 12,
      left: Math.random() * 98,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.45 + 0.25,
      wobble: Math.random() * 24 - 12,
    }));
  }, [count]);

  const handlePop = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playBubblePop(1.2);
    // Visual pop feedback handled by CSS or tap animation
  };

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '105vh', x: 0, opacity: 0 }}
          animate={{
            y: '-15vh',
            x: [0, b.wobble, -b.wobble, 0],
            opacity: [0, b.opacity, b.opacity, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={handlePop}
          className="pointer-events-auto cursor-pointer absolute rounded-full border border-white/70 bg-gradient-to-tr from-cyan-300/30 to-white/10 backdrop-blur-[1px] shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-transform hover:scale-125 active:scale-0"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
          }}
          title="Click to pop bubble!"
        >
          <div className="w-1.5 h-1.5 bg-white/90 rounded-full ml-1.5 mt-1.5 blur-[0.3px]" />
        </motion.div>
      ))}
    </div>
  );
};
