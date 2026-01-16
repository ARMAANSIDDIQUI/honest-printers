"use client";

import { useEffect, useRef, useState } from "react";
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
        repeatDelay: 4,
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

function StaticStar({ x, y, size, opacity, delay, duration }) {
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
        duration: duration,
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
  const [mounted, setMounted] = useState(false);
  const [staticStars, setStaticStars] = useState([]);

  useEffect(() => {
    setMounted(true);
    setStaticStars(Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 2
    })));
  }, []);

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div 
          className="absolute inset-0 bg-slate-50 dark:bg-slate-950" 
        />
      </div>
    );
  }

  const shootingStars = [
    { id: 1, delay: 0.5, duration: 0.8, startX: 100, startY: 50 },
    { id: 2, delay: 3, duration: 1.2, startX: 300, startY: 20 },
    { id: 3, delay: 5.5, duration: 1.0, startX: 600, startY: 80 }
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
              : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(240, 240, 255, 0.8) 100%), radial-gradient(circle at 80% 20%, rgba(230, 230, 250, 0.5) 0%, transparent 50%)"
          }}
        />
      
      {staticStars.map((star) => (
        <StaticStar
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          opacity={isDark ? star.opacity : star.opacity * 0.6} // Slightly subtle stars in light mode
          delay={star.delay}
          duration={star.duration}
        />
      ))}
      
      {/* Show shooting stars in light mode too but fainter? No, keeping distinct. Maybe add subtle floating particles for light mode instead? For now let's keep shooting stars dark mode exclusive or make them very dark in light mode. Let's just keep them dark mode specific as per original design constraints, but improve the background gradient above. */}
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