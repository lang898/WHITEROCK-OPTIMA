import React, { createContext, useContext, useMemo, useState } from 'react';

export type UnitSystem = 'imperial' | 'metric';

interface UnitContextValue {
  unitSystem: UnitSystem;
  setUnitSystem: (unit: UnitSystem) => void;
  formatMeasurement: (value?: string) => string;
}

const UnitContext = createContext<UnitContextValue | null>(null);

function decimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function inchesFromFraction(whole: string | undefined, fraction: string | undefined, direct: string | undefined): number {
  if (direct) return Number(direct);
  const wholeValue = whole ? Number(whole.trim()) : 0;
  if (!fraction) return wholeValue;
  const [top, bottom] = fraction.split('/').map(Number);
  return wholeValue + (bottom ? top / bottom : 0);
}

function convertDimensionGroup(value: string, sourceUnit: RegExp, factor: number, targetUnit: string): string {
  const dimensionGroup = new RegExp(`((?:\\d+(?:\\.\\d+)?\\s*[x×]\\s*)+\\d+(?:\\.\\d+)?)\\s*(?:${sourceUnit.source})`, 'gi');
  return value.replace(dimensionGroup, (_match, dimensions: string) => {
    const converted = dimensions.replace(/\d+(?:\.\d+)?/g, (amount) => decimal(Number(amount) * factor));
    return `${converted} ${targetUnit}`;
  });
}

export function formatMeasurementText(value: string | undefined, unitSystem: UnitSystem): string {
  if (!value) return 'Confirm by quotation';

  if (unitSystem === 'metric') {
    return convertDimensionGroup(value, /in|inch|inches|"/, 25.4, 'mm')
      .replace(/(?:(\d+)\s+)?(\d+\/\d+)\s*(?:in|inch|inches|")/gi, (_match, whole, fraction) => `${decimal(inchesFromFraction(whole, fraction, undefined) * 25.4)} mm`)
      .replace(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches|")/gi, (_match, amount) => `${decimal(Number(amount) * 25.4)} mm`)
      .replace(/(\d+(?:\.\d+)?)\s*cm\b/gi, (_match, amount) => `${decimal(Number(amount) * 10)} mm`);
  }

  return convertDimensionGroup(value, /mm/, 1 / 25.4, 'in')
    .replace(/(\d+(?:\.\d+)?)\s*mm\b/gi, (_match, amount) => `${decimal(Number(amount) / 25.4)} in`)
    .replace(/(\d+(?:\.\d+)?)\s*cm\b/gi, (_match, amount) => `${decimal(Number(amount) / 2.54)} in`);
}

export const UnitProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>(() => {
    try {
      return localStorage.getItem('whiterock_units') === 'metric' ? 'metric' : 'imperial';
    } catch {
      return 'imperial';
    }
  });

  const setUnitSystem = (unit: UnitSystem) => {
    setUnitSystemState(unit);
    try {
      localStorage.setItem('whiterock_units', unit);
    } catch {
      // Browsing remains functional when storage is unavailable.
    }
  };

  const value = useMemo<UnitContextValue>(() => ({
    unitSystem,
    setUnitSystem,
    formatMeasurement: (measurement) => formatMeasurementText(measurement, unitSystem)
  }), [unitSystem]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export function useUnits(): UnitContextValue {
  const context = useContext(UnitContext);
  if (!context) throw new Error('useUnits must be used inside UnitProvider');
  return context;
}
