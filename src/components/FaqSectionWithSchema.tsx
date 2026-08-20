import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Check,
  Copy,
  Code2,
  FileCheck,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { faqList, faqIntro } from '../data';
import type { FaqItem, LocaleConfig } from '../types';

interface FaqSectionWithSchemaProps {
  currentLocale?: LocaleConfig;
  title?: string;
  subtitle?: string;
  categoryFilter?: string;
  showSchemaInspector?: boolean;
  className?: string;
}

export const FaqSectionWithSchema: React.FC<FaqSectionWithSchemaProps> = ({
  currentLocale,
  title = 'Frequently Asked Questions & B2B Stone Guide',
  subtitle = 'Authoritative technical answers, tariff guidelines, dimensional tolerances, and container shipping details for North American builders, hospitality developers, and stone importers.',
  categoryFilter,
  showSchemaInspector = true,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showRawJsonLd, setShowRawJsonLd] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    faqList.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered FAQ items based on search and category
  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const q = item.question || item.q || '';
      const a = item.answer || item.a || '';
      const cat = item.category || '';

      const matchesCat =
        activeCategory === 'All' ||
        cat.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Construct valid Schema.org FAQPage JSON-LD object
  const faqSchemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'name': 'WHITEROCK & OPTIMA Stone Industry B2B FAQ',
      'description': faqIntro,
      'mainEntity': faqList.map((item) => ({
        '@type': 'Question',
        'name': item.question || item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer || item.a
        }
      }))
    };
  }, []);

  const schemaString = useMemo(() => {
    return JSON.stringify(faqSchemaData, null, 2);
  }, [faqSchemaData]);

  // Ensure JSON-LD is injected in document.head for search crawlers
  useEffect(() => {
    const scriptId = 'whiterock-stone-faq-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = schemaString;

    return () => {
      // Keep script tag persistent or updated
    };
  }, [schemaString]);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Invisible Schema.org JSON-LD tag inside component tree for SEO crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaString }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>SEO Schema.org Structured Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* JSON-LD Schema Inspector Toggle */}
        {showSchemaInspector && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowRawJsonLd(!showRawJsonLd)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                showRawJsonLd
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white hover:border-stone-600'
              }`}
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>{showRawJsonLd ? 'Hide JSON-LD Markup' : 'View JSON-LD Schema'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Raw Schema.org JSON-LD Inspector Panel */}
      {showRawJsonLd && (
        <div className="bg-stone-950 border border-amber-500/40 rounded-2xl p-5 space-y-3 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-amber-400">
                Schema.org / Google Rich Results Validated JSON-LD (FAQPage)
              </span>
            </div>
            <button
              onClick={handleCopySchema}
              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs font-semibold text-stone-200 border border-stone-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy JSON-LD</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-[11px] font-mono text-emerald-400 bg-stone-900 p-4 rounded-xl overflow-x-auto max-h-72 leading-relaxed border border-stone-800/80">
            {schemaString}
          </pre>
          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>Contains {faqList.length} structured stone procurement entities.</span>
            <span className="text-stone-300">Injected into page header for Googlebot & Bingbot.</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. tariff, sink, tolerance, MOQ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const qText = faq.question || faq.q;
          const aText = faq.answer || faq.a;

          return (
            <div
              key={idx}
              className={`bg-stone-900 border rounded-2xl overflow-hidden transition-all shadow-sm ${
                isOpen ? 'border-amber-500/50 bg-stone-900/90' : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/30 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1 pr-2">
                  {faq.category && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-sm sm:text-base text-white">
                    {qText}
                  </h3>
                </div>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isOpen
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 rotate-180'
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-stone-300 border-t border-stone-800/80 pt-3.5 leading-relaxed space-y-2 animate-fadeIn">
                  <p>{aText}</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verified Stone Engineering & Procurement Protocol</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-10 text-center bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
            <p className="text-stone-300 font-medium text-sm">
              No questions found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
            >
              Reset Filters & View All Questions
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
