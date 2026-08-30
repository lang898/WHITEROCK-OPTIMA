import { ClipboardList, Trash2, X } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef } from 'react';
import type { RequestItem } from '../types';
import { InquiryForm } from './InquiryForm';

interface RequestPanelProps {
  open: boolean;
  items: RequestItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function RequestPanel({ open, items, onClose, onRemove, onClear }: RequestPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onEscape = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open, onClose]);

  if (!open) return null;

  function trapFocus(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="request-panel" role="dialog" aria-modal="true" aria-labelledby="request-title" onKeyDown={trapFocus} onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div><p className="eyebrow">RFQ builder</p><h2 id="request-title">Request list</h2></div>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="Close request list"><X /></button>
        </header>
        {items.length ? (
          <div className="request-items">
            {items.map((item) => (
              <div key={item.id}>
                <span><small>{item.kind}</small><strong>{item.label}</strong></span>
                <button className="icon-button" type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.label}`}><Trash2 size={17} /></button>
              </div>
            ))}
            <button className="text-button" type="button" onClick={onClear}>Clear list</button>
          </div>
        ) : (
          <div className="empty-state"><ClipboardList size={30} /><p>Add products or color directions, then send one combined inquiry.</p></div>
        )}
        <InquiryForm formType="Request list" selectedItems={items.map((item) => item.label)} compact />
      </aside>
    </div>
  );
}
