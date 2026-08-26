/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactRail } from './components/ContactRail';
import { BackToTop } from './components/BackToTop';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { PageSeo } from './components/PageSeo';
import { RouteLoading } from './components/RouteLoading';

import { locales } from './data/site';
import type { ProductItem, ColorItem, RfqCartItem, LocaleConfig } from './types';
import type { ShareContent } from './components/SocialShareModal';
import { routeIdFromLocation, routePath, routesById, type RouteId } from './routes';

const HomeView = lazy(() => import('./views/HomeView').then((module) => ({ default: module.HomeView })));
const AboutView = lazy(() => import('./views/AboutView').then((module) => ({ default: module.AboutView })));
const ProductsView = lazy(() => import('./views/ProductsView').then((module) => ({ default: module.ProductsView })));
const ColorsView = lazy(() => import('./views/ColorsView').then((module) => ({ default: module.ColorsView })));
const FinishesEdgesView = lazy(() => import('./views/FinishesEdgesView').then((module) => ({ default: module.FinishesEdgesView })));
const FactoryView = lazy(() => import('./views/FactoryView').then((module) => ({ default: module.FactoryView })));
const ApplicationsView = lazy(() => import('./views/ApplicationsView').then((module) => ({ default: module.ApplicationsView })));
const PartnersView = lazy(() => import('./views/PartnersView').then((module) => ({ default: module.PartnersView })));
const ResourcesView = lazy(() => import('./views/ResourcesView').then((module) => ({ default: module.ResourcesView })));
const ContactView = lazy(() => import('./views/ContactView').then((module) => ({ default: module.ContactView })));
const AdminView = lazy(() => import('./views/AdminView').then((module) => ({ default: module.AdminView })));

const RfqModal = lazy(() => import('./components/RfqModal').then((module) => ({ default: module.RfqModal })));
const ProductModal = lazy(() => import('./components/ProductModal').then((module) => ({ default: module.ProductModal })));
const ColorModal = lazy(() => import('./components/ColorModal').then((module) => ({ default: module.ColorModal })));
const WeChatModal = lazy(() => import('./components/WeChatModal').then((module) => ({ default: module.WeChatModal })));
const SocialShareModal = lazy(() => import('./components/SocialShareModal').then((module) => ({ default: module.SocialShareModal })));

function AppContent() {
  const [currentTab, setCurrentTab] = useState<RouteId>(() => routeIdFromLocation());
  const [currentLocale, setCurrentLocale] = useState<LocaleConfig>(locales[0]);

  useEffect(() => {
    const syncRouteFromUrl = () => setCurrentTab(routeIdFromLocation());

    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('hashchange', syncRouteFromUrl);

    const initialRoute = routeIdFromLocation();
    if (window.location.hash) {
      window.history.replaceState({ routeId: initialRoute }, '', routePath(initialRoute));
    }

    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('hashchange', syncRouteFromUrl);
    };
  }, []);

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
    const nextRoute = routesById[tab as RouteId] ? (tab as RouteId) : 'home';
    const nextPath = routePath(nextRoute);

    setCurrentTab(nextRoute);
    if (window.location.pathname !== nextPath || window.location.hash) {
      window.history.pushState({ routeId: nextRoute }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="hybrid-site min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-stone-900">
      <PageSeo routeId={currentTab} language={currentLocale.id} />
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
      <Suspense fallback={<RouteLoading />}>
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
      </Suspense>

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

      {/* Modal code is requested only after the related interaction begins. */}
      <Suspense fallback={null}>
        {isRfqModalOpen && (
          <RfqModal
            isOpen
            onClose={() => setIsRfqModalOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onShare={handleOpenShare}
          />
        )}

        {selectedColor && (
          <ColorModal
            color={selectedColor}
            onClose={() => setSelectedColor(null)}
            onRequestSample={handleAddColorSample}
            onShare={handleOpenShare}
          />
        )}

        {isWeChatModalOpen && (
          <WeChatModal isOpen onClose={() => setIsWeChatModalOpen(false)} />
        )}

        {shareModalContent && (
          <SocialShareModal
            isOpen
            onClose={() => setShareModalContent(null)}
            content={shareModalContent}
          />
        )}
      </Suspense>

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

export default function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  );
}
