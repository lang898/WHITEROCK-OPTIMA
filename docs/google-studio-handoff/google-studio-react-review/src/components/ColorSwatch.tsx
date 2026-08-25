import type { CSSProperties } from 'react';
import type { ColorDirection } from '../types';

interface ColorSwatchProps {
  color: ColorDirection;
  compact?: boolean;
}

export function ColorSwatch({ color, compact = false }: ColorSwatchProps) {
  const style = {
    '--swatch-base': color.base,
    '--swatch-accent': color.accent,
  } as CSSProperties;

  return (
    <div
      className={`color-swatch${compact ? ' color-swatch--compact' : ''}`}
      style={style}
      role="img"
      aria-label={`${color.name} digital color direction; physical sample required`}
    >
      <span>Digital reference</span>
    </div>
  );
}
