"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

function ShootingStar({ delay, duration, startX, startY }) {
  return (
    <motion.div
      className="absolute w-[2px] h-[2px] bg-white rounded-full"
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: [startX, startX + 200],
        y: [startY, startY + 200],
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 15,
        ease: "linear"
      }}
      style={{
        boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.3), -80px -80px 0 -1px rgba(255, 255, 255, 0.1)"
      }}
    >
      <motion.div
        className="absolute w-[100px] h-[1px] -left-[100px] top-0"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4))",
          transform: "rotate(-45deg)",
          transformOrigin: "right center"
        }}
      />
    </motion.div>
  );
}

function StaticStar({ x, y, size, opacity, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white dark:bg-white bg-slate-400"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        boxShadow: size > 1.5 ? "0 0 4px 1px rgba(255, 255, 255, 0.2)" : "none"
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [opacity * 0.2, opacity, opacity * 0.2]
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function StarryBackground() {
  const containerRef = useRef(null);
  const { theme, resolvedTheme } = useTheme();
  
  const staticStars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 2
  }));

  const shootingStars = [
    { id: 1, delay: 2, duration: 2.5, startX: 100, startY: 50 },
    { id: 2, delay: 12, duration: 2, startX: 300, startY: 20 },
    { id: 3, delay: 22, duration: 2.8, startX: 600, startY: 80 }
  ];

  const isDark = resolvedTheme === "dark";

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-20'}`}
      style={{ zIndex: 0 }}
    >
        <div 
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: isDark 
              ? "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0) 0%, rgba(2, 6, 23, 0.5) 100%), radial-gradient(circle at 20% 20%, rgba(30, 41, 59, 0.4) 0%, transparent 40%)"
              : "radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0) 0%, rgba(241, 245, 249, 0.5) 100%)"
          }}
        />
      
      {staticStars.map((star) => (
        <StaticStar
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          opacity={star.opacity}
          delay={star.delay}
        />
      ))}
      
      {isDark && shootingStars.map((star) => (
        <ShootingStar
          key={star.id}
          delay={star.delay}
          duration={star.duration}
          startX={star.startX}
          startY={star.startY}
        />
      ))}
    </div>
  );
}
