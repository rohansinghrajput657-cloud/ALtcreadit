import React, { useState, useEffect } from 'react';

/**
 * CursorGlow Component
 * Follows mouse position on desktop only.
 * pointer-events: none, subtle warm navy/paper glow, disabled on touch devices.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '380px',
        height: '380px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(19, 35, 58, 0.045) 0%, rgba(19, 35, 58, 0.015) 45%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}

