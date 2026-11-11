import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight once-only IntersectionObserver hook for subtle GPU-only 0.3s reveals.
 * Immediately reveals when IntersectionObserver is unavailable or reduced-motion is preferred.
 */
export function useScrollReveal({ threshold = 0.08, rootMargin = '0px 0px -32px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, threshold, rootMargin]);

  return { ref, isVisible };
}
