import { Image, Layers3, ScanLine } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  detail?: string;
  tone?: 'light' | 'dark' | 'green';
  compact?: boolean;
}

export function MediaPlaceholder({
  label,
  detail = 'Photo pending owner upload',
  tone = 'light',
  compact = false,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder media-placeholder--${tone}${compact ? ' media-placeholder--compact' : ''}`}
      role="img"
      aria-label={`${label}; photo placeholder pending owner upload`}
    >
      <span className="media-placeholder__grid" aria-hidden="true" />
      <div className="media-placeholder__mark" aria-hidden="true">
        <Layers3 size={compact ? 18 : 24} />
        <ScanLine size={compact ? 18 : 24} />
      </div>
      <div>
        <strong>{label}</strong>
        <span><Image size={14} /> {detail}</span>
      </div>
    </div>
  );
}
