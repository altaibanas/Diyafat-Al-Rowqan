import React from 'react';
import { useFoilSpecular } from '../../hooks/useFoilSpecular';
import { cn } from '../../utils/cn';

export function FoilButton({
  children,
  onClick,
  href,
  variant = 'gold', // 'gold' | 'outline' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  type = 'button',
  disabled = false,
}) {
  const { ref, glareStyle, handlers } = useFoilSpecular({
    is3d: false,
    glareOpacity: 0.6,
  });

  const sizes = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wide',
    md: 'px-6 py-3 text-sm font-bold tracking-wider',
    lg: 'px-8 py-4 text-base font-bold tracking-wider',
  }[size];

  const variants = {
    gold: `
      bg-gradient-to-r from-gold-dark via-gold-royal to-gold-champagne
      text-navy-950 font-bold shadow-foil
      border border-gold-light/40
      hover:brightness-105 active:scale-[0.98]
    `,
    outline: `
      bg-navy-elevated/70 text-gold-champagne
      border border-gold-royal/50 hover:border-gold-royal
      hover:bg-navy-elevated/90 active:scale-[0.98]
      shadow-sm
    `,
    dark: `
      bg-navy-950/90 text-alabaster-cotton
      border border-gold-royal/30 hover:border-gold-royal/60
      hover:bg-navy-royal active:scale-[0.98]
    `,
  }[variant];

  const content = (
    <>
      {/* Dynamic Specular Gold Foil Reflection Layer */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={glareStyle}
      />
      
      {/* Subtle Inner Hairline */}
      <div className="absolute inset-[1px] pointer-events-none border border-white/20 rounded-[inherit]" />

      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        {Icon && <Icon className="w-4 h-4 text-current transition-transform duration-300 group-hover:scale-110" />}
        <span>{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        {...handlers}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 font-tajawal select-none',
          sizes,
          variants,
          className
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...handlers}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 font-tajawal select-none disabled:opacity-50 disabled:pointer-events-none',
        sizes,
        variants,
        className
      )}
    >
      {content}
    </button>
  );
}
