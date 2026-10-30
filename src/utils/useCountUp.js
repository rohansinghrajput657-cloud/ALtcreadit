import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp hook
 * Animates a number from startValue to endValue using requestAnimationFrame with ease-out.
 * Guarantees that the final value equals endValue exactly.
 * 
 * @param {number} endValue Target number
 * @param {number} duration Duration in ms (default 1500)
 * @param {number} delay Delay before starting in ms (default 0)
 * @param {any} trigger Dependency to re-trigger count-up (e.g. animationKey)
 * @param {number} startValue Starting number (default 0)
 */
export function useCountUp(endValue, duration = 1500, delay = 0, trigger = 0, startValue = 0) {
  const [value, setValue] = useState(startValue);
  const startTimeRef = useRef(null);
  const rAFRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // If reduced motion is preferred, jump straight to endValue
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(endValue);
      return;
    }

    setValue(startValue);

    timeoutRef.current = setTimeout(() => {
      const startAnimTime = performance.now();
      startTimeRef.current = startAnimTime;

      const animate = (now) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quartic Ease-Out: 1 - pow(1 - t, 4)
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(startValue + (endValue - startValue) * easeOut);
        
        setValue(current);

        if (progress < 1) {
          rAFRef.current = requestAnimationFrame(animate);
        } else {
          setValue(endValue); // Strict guarantee
        }
      };

      rAFRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [endValue, duration, delay, trigger, startValue]);

  return value;
}

