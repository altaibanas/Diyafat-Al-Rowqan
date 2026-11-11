import { useCallback, useRef, useMemo } from 'react';

/**
 * useFoilSpecular (Zero-Re-Render GPU/CSS-Var Edition)
 * Simulates metallic sheen on desktop fine pointers via direct CSS variables throttled by rAF.
 * Completely inactive on touch devices (hover: none) and reduced-motion preferences so phones stay 60fps.
 */
export function useFoilSpecular({
  maxTilt = 8,
  glareOpacity = 0.45,
  is3d = true,
} = {}) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  const canHoverFine = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!canHoverFine || !ref.current) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const percentX = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
        const percentY = Math.min(Math.max(((clientY - rect.top) / rect.height) * 100, 0), 100);

        el.style.setProperty('--foil-x', `${percentX.toFixed(1)}%`);
        el.style.setProperty('--foil-y', `${percentY.toFixed(1)}%`);
        el.style.setProperty('--foil-op', `${glareOpacity}`);

        if (is3d) {
          const tiltX = (((percentY - 50) / 50) * -maxTilt).toFixed(2);
          const tiltY = (((percentX - 50) / 50) * maxTilt).toFixed(2);
          el.style.setProperty('--tilt-rx', `${tiltX}deg`);
          el.style.setProperty('--tilt-ry', `${tiltY}deg`);
          el.style.setProperty('--tilt-sc', '1.015');
        }
      });
    },
    [canHoverFine, glareOpacity, is3d, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--foil-op', '0');
    if (is3d) {
      el.style.setProperty('--tilt-rx', '0deg');
      el.style.setProperty('--tilt-ry', '0deg');
      el.style.setProperty('--tilt-sc', '1');
    }
  }, [is3d]);

  const glareStyle = useMemo(
    () =>
      canHoverFine
        ? {
            opacity: 'var(--foil-op, 0)',
            background:
              'radial-gradient(circle 180px at var(--foil-x, 50%) var(--foil-y, 50%), rgba(253, 249, 242, 0.65) 0%, rgba(230, 199, 123, 0.32) 38%, rgba(200, 155, 67, 0) 70%)',
            transition: 'opacity 0.25s ease-out',
            pointerEvents: 'none',
          }
        : { display: 'none' },
    [canHoverFine]
  );

  const tiltStyle = useMemo(
    () =>
      is3d && canHoverFine
        ? {
            transform:
              'perspective(1000px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg)) scale3d(var(--tilt-sc, 1), var(--tilt-sc, 1), var(--tilt-sc, 1))',
            transition: 'transform 0.22s ease-out',
          }
        : {},
    [is3d, canHoverFine]
  );

  const handlers = useMemo(
    () =>
      canHoverFine
        ? {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
          }
        : {},
    [canHoverFine, handleMouseMove, handleMouseLeave]
  );

  return {
    ref,
    glareStyle,
    tiltStyle,
    handlers,
  };
}
