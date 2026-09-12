import React from 'react';
import { motion } from 'motion/react';

export const FlowerClouds: React.FC = () => {
  const flowers = [
    { top: '5%', left: '7%', color: '#38bdf8', scale: 1.15, rot: 15, duration: 18 },
    { top: '10%', right: '12%', color: '#f472b6', scale: 1.35, rot: -25, duration: 22 },
    { top: '32%', left: '4%', color: '#a78bfa', scale: 0.95, rot: 40, duration: 16 },
    { top: '52%', right: '6%', color: '#4ade80', scale: 1.2, rot: -10, duration: 20 },
    { top: '74%', left: '8%', color: '#fb923c', scale: 0.85, rot: 30, duration: 19 },
    { top: '88%', right: '10%', color: '#facc15', scale: 1.1, rot: -35, duration: 24 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((f, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          animate={{
            rotate: [f.rot - 8, f.rot + 8, f.rot - 8],
            x: [0, 15, -15, 0],
            y: [0, -10, 5, 0],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute opacity-35 drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            width: `${105 * f.scale}px`,
            height: `${105 * f.scale}px`,
          }}
        >
          {/* SpongeBob style flower cloud outline */}
          <path
            d="M50 28 C42 8, 15 18, 22 36 C5 44, 8 72, 30 70 C24 92, 54 96, 62 76 C82 90, 96 66, 82 48 C100 32, 76 8, 50 28 Z"
            fill="none"
            stroke={f.color}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="5" fill={f.color} />
        </motion.svg>
      ))}
    </div>
  );
};
