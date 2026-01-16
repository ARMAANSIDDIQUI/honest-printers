"use client";

import React, { useState, useEffect } from "react";

const STAR_COUNT = 250;

export function ShootingStarBackground() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState([]);








  useEffect(() => {
    setMounted(true);

    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const initialLeft = `${Math.random() * 150 - 50}vw`; // From -50vw to 100vw
        const initialTop = `${Math.random() * 150 - 50}vh`;   // From -50vh to 100vh

        newStars.push({
          id: i,
          top: initialTop,
          left: initialLeft,
          animationDelay: `${Math.random() * 10}s`, // Smaller delay range for more frequent appearance
          animationDuration: `${10 + Math.random() * 15}s`, // Increase duration range (10 to 25s)
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
       {/* Base gradient background for Light Theme - kept as per previous request */}
       <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
             background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 248, 255, 0.9) 100%), radial-gradient(circle at 10% 10%, rgba(219, 234, 254, 0.6) 0%, transparent 60%)"
          }}
        />

      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        ></div>
      ))}
    </div>
  );
}