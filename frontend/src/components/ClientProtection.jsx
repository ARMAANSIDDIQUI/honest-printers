"use client";

import { useEffect } from "react";

export default function ClientProtection() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e) => {
      // Prevent common copy/inspect shortcuts if desired, mainly for images
      // Ctrl+C (Copy), Ctrl+S (Save), Ctrl+U (View Source), F12 (DevTools), Ctrl+Shift+I (DevTools)
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I'))
      ) {
         // We can choose to be aggressive or just stick to the requested "disable image select and copy"
         // The user specifically asked to disable "image select and copy". 
         // Standard Ctrl+C doesn't usually copy an image unless selected. 
         // Since selection is disabled via CSS, Ctrl+C might not catch anything.
         // But for safety:
         // e.preventDefault(); 
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    // document.addEventListener("keydown", handleKeyDown); // Optional, uncomment if user wants strict anti-copy

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      // document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
