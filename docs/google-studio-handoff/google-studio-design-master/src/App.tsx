/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactRail } from './components/ContactRail';
import { BackToTop } from './components/BackToTop';
import { RfqModal } from './components/RfqModal';
import { ProductModal } from './components/ProductModal';
import { ColorModal } from './components/ColorModal';
import { WeChatModal } from './components/WeChatModal';
import { SocialShareModal, ShareContent } from './components/SocialShareModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProductsView } from './views/ProductsView';
import { ColorsView } from './views/ColorsView';
import { FinishesEdgesView } from './views/FinishesEdgesView';
import { FactoryView } from './views/FactoryView';
import { ApplicationsView } from './views/ApplicationsView';
import { PartnersView } from './views/PartnersView';
import { ResourcesView } from './views/ResourcesView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

import { locales } from './data';
import type { ProductItem, ColorItem, RfqCartItem, LocaleConfig } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLocale, setCurrentLocale] = useState<LocaleConfig>(locales[0]);

  // Modals state
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [shareModalContent, setShareModalContent] = useState<ShareContent | null>(null);

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

  const handleOpenShare = (content?: ShareContent) => {
    if (content) {
      setShareModalContent(content);
    } else {
      setShareModalContent({
        title: 'WHITEROCK SURFACES VIETNAM - Direct B2B Stone & Vanity Top Manufacturer',
        text: '20,000 m² Vietnam Stone Plant with 0% US Section 301 Tariff. Precision Quartz, Marble Countertops & Vanity Tops with Pre-Mounted Sinks.',
        type: 'site'
      });
    }
  };

  const handleAddToCart = (prod: ProductItem | RfqCartItem) => {
    if ('type' in prod && prod.type === 'product' && !('specs' in prod)) {
      // It's already a configured RfqCartItem from VanityConfigurator
      setCartItems((prev) => [...prev, prod as RfqCartItem]);
      showToast(`Added ${prod.title} to RFQ package`);
      return;
    }

    const p = prod as ProductItem;
    const existing = cartItems.find((item) => item.sku === p.sku);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) => (i.sku === p.sku ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      const newItem: RfqCartItem = {
        id: `prod_${p.sku}_${Date.now()}`,
        title: p.title,
        type: 'product',
        sku: p.sku,
        material: p.material,
        selectedThickness: p.specs.Thickness || '2cm / 3cm',
        selectedEdge: p.specs.Edge || 'Eased',
        quantity: 1,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added ${p.sku} to RFQ kit`);
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
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* Header with Navigation and RFQ Count */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsRfqModalOpen(true)}
        currentLocale={currentLocale}
        setLocale={setCurrentLocale}
        onOpenWeChat={() => setIsWeChatModalOpen(true)}
        onOpenShare={() => handleOpenShare()}
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
            onOpenShareModal={handleOpenShare}
            onOpenWeChat={() => setIsWeChatModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            currentLocale={currentLocale}
            setCurrentTab={handleTabChange}
            onOpenWeChat={() => setIsWeChatModalOpen(true)}
            onOpenShareModal={handleOpenShare}
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
            onOpenWeChat={() => setIsWeChatModalOpen(true)}
            onOpenShareModal={handleOpenShare}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            currentLocale={currentLocale}
            setCurrentTab={handleTabChange}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLocale={currentLocale}
        setCurrentTab={handleTabChange}
        onOpenWeChat={() => setIsWeChatModalOpen(true)}
        onOpenShare={() => handleOpenShare()}
      />

      {/* Floating Quick Action Contact & Quote Rail */}
      <ContactRail
        onOpenRfq={() => setIsRfqModalOpen(true)}
        onOpenWeChat={() => setIsWeChatModalOpen(true)}
        onOpenShare={() => handleOpenShare()}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Floating Back to Top Navigation */}
      <BackToTop threshold={350} />

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
        onShare={handleOpenShare}
      />

      <ColorModal
        color={selectedColor}
        onClose={() => setSelectedColor(null)}
        onRequestSample={handleAddColorSample}
        onShare={handleOpenShare}
      />

      {/* WeChat QR Direct Modal */}
      <WeChatModal
        isOpen={isWeChatModalOpen}
        onClose={() => setIsWeChatModalOpen(false)}
      />

      {/* Multi-platform Social Share Modal */}
      <SocialShareModal
        isOpen={!!shareModalContent}
        onClose={() => setShareModalContent(null)}
        content={shareModalContent}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-stone-700 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

