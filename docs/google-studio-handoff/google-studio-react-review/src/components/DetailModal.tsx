import { FileText, Plus, X } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef } from 'react';
import type { ColorDirection, Product } from '../types';
import { ColorSwatch } from './ColorSwatch';
import { MediaPlaceholder } from './MediaPlaceholder';

interface DetailModalProps {
  item: Product | ColorDirection | null;
  onClose: () => void;
  onAdd: () => void;
}

function isProduct(item: Product | ColorDirection): item is Product {
  return 'sku' in item;
}

export function DetailModal({ item, onClose, onAdd }: DetailModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const closeOnEscape = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [item, onClose]);

  if (!item) return null;
  const itemName = isProduct(item) ? item.title : item.name;

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onKeyDown={trapFocus} onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close details"><X /></button>
        <div className="detail-modal__visual">
          {isProduct(item) ? <MediaPlaceholder label={item.title} tone="dark" /> : <ColorSwatch color={item} />}
        </div>
        <div className="detail-modal__content">
          <p className="eyebrow">{isProduct(item) ? `${item.category} / ${item.sku}` : `${item.material} / ${item.family}`}</p>
          <h2 id="detail-title">{itemName}</h2>
          {isProduct(item) ? (
            <>
              <p>{item.summary}</p>
              <h3>Material direction</h3><p>{item.material}</p>
              <h3>Size direction</h3><ul>{item.sizes.map((value) => <li key={value}>{value}</li>)}</ul>
              <h3>Options to review</h3><ul>{item.options.map((value) => <li key={value}>{value}</li>)}</ul>
            </>
          ) : (
            <>
              <p>Digital color direction only. Request a physical sample and confirm the current production lot before specifying.</p>
              <h3>Finish directions</h3><p>{item.finishes.join(', ')}</p>
              <h3>Thickness directions</h3><p>{item.thicknesses.join(', ')}</p>
              <h3>Related product references</h3><p>{item.related.join(', ')}</p>
            </>
          )}
          <div className="modal-actions">
            <button className="button button--primary" type="button" onClick={onAdd}><Plus size={17} />Add to request</button>
            <span className="muted-action"><FileText size={16} />Specification PDF pending owner approval</span>
          </div>
        </div>
      </div>
    </div>
  );
}
