/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { ProductModal } from './components/ProductModal';
import { ColorModal } from './components/ColorModal';

import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ColorsView } from './views/ColorsView';
import { FinishesEdgesView } from './views/FinishesEdgesView';
import { FactoryView } from './views/FactoryView';
import { ApplicationsView } from './views/ApplicationsView';
import { PartnersView } from './views/PartnersView';
import { ResourcesView } from './views/ResourcesView';
import { ContactView } from './views/ContactView';

import { locales } from './data';
import type { ProductItem, ColorItem, RfqCartItem, LocaleConfig } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLocale, setCurrentLocale] = useState<LocaleConfig>(locales[0]);

  // Modals state
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);

  // RFQ Cart State
  const [cartItems, setCartItems] = useState<RfqCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('whiterock_rfq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('whiterock_rfq_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (prod: ProductItem) => {
    const existing = cartItems.find((item) => item.sku === prod.sku);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) => (i.sku === prod.sku ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      const newItem: RfqCartItem = {
        id: `prod_${prod.sku}_${Date.now()}`,
        title: prod.title,
        type: 'product',
        sku: prod.sku,
        material: prod.material,
        selectedThickness: prod.specs.Thickness || '2cm / 3cm',
        selectedEdge: prod.specs.Edge || 'Eased',
        quantity: 1,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added ${prod.sku} to RFQ kit`);
  };

  const handleAddColorSample = (color: ColorItem) => {
    const sampleId = `sample_${color.slug}`;
    const existing = cartItems.find((item) => item.id === sampleId);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) => (i.id === sampleId ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      const newItem: RfqCartItem = {
        id: sampleId,
        title: `${color.name} (4x4" Physical Chip)`,
        type: 'sample',
        material: color.material,
        selectedColor: color.name,
        quantity: 1,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added ${color.name} 4x4" chip to sample box`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as RfqCartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to top on tab switch
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-stone-950">
      {/* Header with Navigation and RFQ Count */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsRfqModalOpen(true)}
        currentLocale={currentLocale}
        setLocale={setCurrentLocale}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={handleTabChange}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onSelectColor={(c) => setSelectedColor(c)}
            onAddToCart={handleAddToCart}
            onAddColorSample={handleAddColorSample}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'products' && (
          <ProductsView
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'colors' && (
          <ColorsView
            onSelectColor={(c) => setSelectedColor(c)}
            onAddColorSample={handleAddColorSample}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'finishes' && (
          <FinishesEdgesView
            setCurrentTab={handleTabChange}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'factory' && (
          <FactoryView
            currentLocale={currentLocale}
            setCurrentTab={handleTabChange}
          />
        )}

        {currentTab === 'applications' && (
          <ApplicationsView
            onSelectColor={(c) => setSelectedColor(c)}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'partners' && (
          <PartnersView
            setCurrentTab={handleTabChange}
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'resources' && (
          <ResourcesView
            currentLocale={currentLocale}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            currentLocale={currentLocale}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLocale={currentLocale}
        setCurrentTab={handleTabChange}
      />

      {/* Interactive Modals */}
      <RfqModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <ColorModal
        color={selectedColor}
        onClose={() => setSelectedColor(null)}
        onRequestSample={handleAddColorSample}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-amber-500/50 text-stone-100 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
