import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../utils/cn';

/**
 * ScrollReveal
 * Smooth 0.3s GPU-composited entrance animation (transform + opacity only).
 */
export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
