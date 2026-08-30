import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { siteConfig } from '../data';

interface InquiryFormProps {
  formType: 'Project inquiry' | 'Distributor inquiry' | 'Request list';
  selectedItems?: string[];
  compact?: boolean;
}

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function InquiryForm({ formType, selectedItems = [], compact = false }: InquiryFormProps) {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const configured = Boolean(siteConfig.web3FormsAccessKey.trim());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setState('sending');
    setMessage('');

    try {
      const data = new FormData(event.currentTarget);
      data.set('access_key', siteConfig.web3FormsAccessKey);
      data.set('subject', `WHITEROCK ${formType}`);
      data.set('selected_items', selectedItems.length ? selectedItems.join('\n') : 'None selected');
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
      event.currentTarget.reset();
      setState('success');
      setMessage('Thank you. Your inquiry has been sent for review.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'The form could not be sent.');
    }
  }

  return (
    <form className={`inquiry-form${compact ? ' inquiry-form--compact' : ''}`} onSubmit={submit}>
      <input type="hidden" name="form_type" value={formType} />
      <input className="honeypot" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />

      <label>
        <span>Name <b aria-hidden="true">*</b></span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Business email <b aria-hidden="true">*</b></span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Company <b aria-hidden="true">*</b></span>
        <input name="company" type="text" autoComplete="organization" required />
      </label>
      <label>
        <span>Region / destination</span>
        <input name="region" type="text" autoComplete="country-name" />
      </label>
      {formType === 'Distributor inquiry' && (
        <>
          <label>
            <span>Business type</span>
            <select name="business_type" defaultValue="">
              <option value="" disabled>Select one</option>
              <option>Distributor / wholesaler</option>
              <option>Fabricator</option>
              <option>Retailer</option>
              <option>Builder / developer</option>
              <option>Hospitality procurement</option>
              <option>Other trade buyer</option>
            </select>
          </label>
          <label>
            <span>Indicative annual volume</span>
            <input name="annual_volume" type="text" placeholder="Range or project direction" />
          </label>
        </>
      )}
      <label className="form-wide">
        <span>Project or sourcing requirements <b aria-hidden="true">*</b></span>
        <textarea name="message" rows={compact ? 4 : 6} required />
      </label>

      {selectedItems.length > 0 && (
        <div className="selected-summary form-wide">
          <strong>Included in this request</strong>
          <span>{selectedItems.join(', ')}</span>
        </div>
      )}

      {!configured && (
        <div className="form-status form-status--notice form-wide">
          <AlertCircle size={17} />
          <span>Online form delivery is awaiting the owner’s Web3Forms access key. Please email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</span>
        </div>
      )}

      {message && (
        <div className={`form-status form-status--${state} form-wide`} role="status">
          {state === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
          <span>{message}</span>
        </div>
      )}

      <div className="form-actions form-wide">
        <button className="button button--primary" type="submit" disabled={!configured || state === 'sending'}>
          {state === 'sending' ? <Loader2 className="spin" size={17} /> : <Send size={17} />}
          {state === 'sending' ? 'Sending…' : 'Send inquiry'}
        </button>
        <small>No pricing, lead time, certification, or customs commitment is created by this form.</small>
      </div>
    </form>
  );
}
