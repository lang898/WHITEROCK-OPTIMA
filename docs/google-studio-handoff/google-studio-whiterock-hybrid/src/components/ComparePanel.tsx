import React, { useState } from 'react';
import { ArrowRightLeft, Check, Trash2, X } from 'lucide-react';
import { t } from '../i18n';
import type { CompareEntry, LocaleConfig } from '../types';
import { useUnits } from './UnitContext';

interface ComparePanelProps {
  items: CompareEntry[];
  locale: LocaleConfig;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function value(entry: CompareEntry, field: 'material' | 'dimensions' | 'thickness' | 'finish' | 'application'): string {
  if (entry.kind === 'product') {
    const item = entry.item;
    if (field === 'material') return item.material;
    if (field === 'dimensions') return item.specs.Size || item.specs.Sizes || item.dimensions || 'By approved drawing';
    if (field === 'thickness') return item.specs.Thickness || item.thicknesses?.join(', ') || 'Confirm by quotation';
    if (field === 'finish') return item.specs.Finish || 'Confirm by sample';
    return item.specs.Use || item.category;
  }
  const item = entry.item;
  if (field === 'material') return item.material;
  if (field === 'dimensions') return item.sizes.join(', ');
  if (field === 'thickness') return item.thicknesses.join(', ');
  if (field === 'finish') return item.finishes.join(', ');
  return item.applications?.join(', ') || 'Confirm by project';
}

function entryTitle(entry: CompareEntry): string {
  return entry.kind === 'product' ? entry.item.title : entry.item.name;
}

export const ComparePanel: React.FC<ComparePanelProps> = ({ items, locale, onRemove, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { formatMeasurement } = useUnits();
  if (!items.length) return null;

  const fields = [
    ['material', t(locale, 'material')],
    ['dimensions', t(locale, 'dimensions')],
    ['thickness', t(locale, 'thickness')],
    ['finish', t(locale, 'finish')],
    ['application', t(locale, 'application')]
  ] as const;

  return (
    <>
      <aside className="wr-compare-tray" aria-label="Comparison selection">
        <div><ArrowRightLeft /><strong>{t(locale, 'compare')}</strong><span>{items.length}/3</span></div>
        <div className="wr-compare-tray__items">
          {items.map((entry) => <span key={entry.id}>{entryTitle(entry)}<button onClick={() => onRemove(entry.id)} aria-label={`${t(locale, 'remove')} ${entryTitle(entry)}`}><X /></button></span>)}
        </div>
        <button className="wr-button wr-button--light" onClick={() => setIsOpen(true)} disabled={items.length < 2}>{t(locale, 'compare')}</button>
      </aside>

      {isOpen && (
        <div className="wr-modal-backdrop" role="dialog" aria-modal="true" aria-label={t(locale, 'compare')}>
          <div className="wr-compare-dialog">
            <header><div><span className="wr-eyebrow">B2B shortlist</span><h2>{t(locale, 'compare')}</h2></div><button className="wr-icon-button" onClick={() => setIsOpen(false)} aria-label="Close comparison"><X /></button></header>
            <div className="wr-compare-table" style={{ '--compare-columns': items.length } as React.CSSProperties}>
              <div className="wr-compare-table__label" />
              {items.map((entry) => <div className="wr-compare-table__head" key={entry.id}><span>{entry.kind}</span><strong>{entryTitle(entry)}</strong><small>{entry.kind === 'product' ? entry.item.sku : entry.item.colorFamily}</small></div>)}
              {fields.map(([field, label]) => (
                <React.Fragment key={field}>
                  <div className="wr-compare-table__label">{label}</div>
                  {items.map((entry) => <div key={`${entry.id}-${field}`}>{field === 'dimensions' || field === 'thickness' ? formatMeasurement(value(entry, field)) : value(entry, field)}{field === 'material' && <Check aria-hidden="true" />}</div>)}
                </React.Fragment>
              ))}
            </div>
            <footer><button className="wr-button wr-button--ghost" onClick={onClear}><Trash2 /> {t(locale, 'clear')}</button><button className="wr-button wr-button--primary" onClick={() => setIsOpen(false)}>Done</button></footer>
          </div>
        </div>
      )}
    </>
  );
};
