import React, { useState } from 'react';
import {
  Package,
  Search,
  SlidersHorizontal,
  Plus,
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { products } from '../data';
import type { ProductItem, LocaleConfig } from '../types';

interface ProductsViewProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  currentLocale: LocaleConfig;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onSelectProduct,
  onAddToCart,
  currentLocale,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Bathroom Vanity Tops',
    'Kitchen Countertops',
    'Stone Furniture',
    'Commercial Projects',
    'Trade Sample Kit'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'All' ||
      (selectedCategory === 'Bathroom Vanity Tops' && p.category.includes('Vanity')) ||
      (selectedCategory === 'Kitchen Countertops' && p.category.includes('Kitchen')) ||
      (selectedCategory === 'Stone Furniture' && p.category.includes('Furniture')) ||
      (selectedCategory === 'Commercial Projects' && (p.category.includes('Commercial') || p.category.includes('Multi-Family') || p.category.includes('Hotel'))) ||
      (selectedCategory === 'Trade Sample Kit' && p.category.includes('Sample'));

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          <span>Vietnam Factory Export Program</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Stone Vanity Tops, Countertops & Furniture
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Full North American standard dimensional programs, undermount ceramic sink integration, factory edge profiling, custom multi-family cut-to-size BOQ packages, and sample boxes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-stone-950 shadow-sm'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by SKU, size, or stone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.sku}
            className="product-card bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 group flex flex-col shadow-sm cursor-pointer"
            onClick={() => onSelectProduct(prod)}
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375" viewBox="0 0 500 375"><rect width="500" height="375" fill="%231c1917"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23f59e0b" font-family="sans-serif" font-size="20">${prod.sku}</text></svg>`;
                }}
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[11px] font-bold text-amber-400 border border-stone-700 font-mono">
                {prod.sku}
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-sm text-[10px] text-stone-300 border border-stone-700">
                {prod.material}
              </div>
              {prod.isIllustrative && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-stone-950/80 text-[9px] text-stone-400">
                  Illustrative render
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {prod.category}
                </span>
                <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors mt-0.5">
                  {prod.title}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Key Specs Table */}
              <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-stone-800 bg-stone-950/40 p-3 rounded-xl">
                {prod.specs.Size && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Dimensions:</span>
                    <strong className="text-stone-200 font-mono">{prod.specs.Size}</strong>
                  </div>
                )}
                {prod.specs.Sink && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Sink Cutout:</span>
                    <span className="text-stone-200">{prod.specs.Sink}</span>
                  </div>
                )}
                {prod.specs.Edge && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Edge:</span>
                    <span className="text-stone-200">{prod.specs.Edge}</span>
                  </div>
                )}
                {prod.specs.MOQ && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">MOQ:</span>
                    <strong className="text-amber-400 font-mono">{prod.specs.MOQ}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod);
                  }}
                  className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to RFQ</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(prod);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                >
                  Full Specs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <p className="text-stone-300 font-medium">No products match your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
