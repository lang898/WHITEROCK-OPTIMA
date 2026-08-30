import { ArrowUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { DetailModal } from './components/DetailModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { RequestPanel } from './components/RequestPanel';
import { ApplicationsPage, ColorsPage, FinishesPage, MaterialsPage, ProductsPage } from './pages/CatalogPages';
import { AboutPage, FactoryPage } from './pages/CompanyPages';
import { ContactPage, PartnersPage, ResourcesPage } from './pages/ConversionPages';
import { HomePage } from './pages/HomePage';
import type { ColorDirection, PageId, Product, RequestItem } from './types';

const validPages: PageId[] = ['home', 'products', 'colors', 'materials', 'finishes', 'factory', 'about', 'applications', 'resources', 'partners', 'contact'];

function pageFromHash(): PageId {
  const value = window.location.hash.replace(/^#\/?/, '') as PageId;
  return validPages.includes(value) ? value : 'home';
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const [requestItems, setRequestItems] = useState<RequestItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('whiterock_request_list') || '[]') as RequestItem[]; }
    catch { return []; }
  });
  const [requestOpen, setRequestOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<Product | ColorDirection | null>(null);
  const [notice, setNotice] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const update = () => setPage(pageFromHash());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    localStorage.setItem('whiterock_request_list', JSON.stringify(requestItems));
  }, [requestItems]);

  useEffect(() => {
    const update = () => setShowBackToTop(window.scrollY > 640);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const labels: Record<PageId, string> = {
      home: 'Home', products: 'Products', colors: 'Stone Colors', materials: 'Materials', finishes: 'Finishes & Edges',
      factory: 'Factory Capability', about: 'About', applications: 'Applications', resources: 'Resources', partners: 'Partners', contact: 'Contact',
    };
    document.title = `${labels[page]} | WHITEROCK Stone`;
  }, [page]);

  const navigate = useCallback((target: PageId) => {
    if (window.location.hash === `#/${target}`) {
      setPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = `/${target}`;
    }
  }, []);

  const addItem = (item: RequestItem) => {
    setRequestItems((current) => current.some((existing) => existing.id === item.id) ? current : [...current, item]);
    setNotice(`${item.label} added to the request list.`);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const addProduct = (product: Product) => addItem({ id: `product-${product.sku}`, label: `${product.sku} ${product.title}`, kind: 'product' });
  const addColor = (color: ColorDirection) => addItem({ id: `color-${color.slug}`, label: `${color.name} color direction`, kind: 'color' });

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header page={page} requestCount={requestItems.length} navigate={navigate} openRequest={() => setRequestOpen(true)} />
      <div id="main-content" tabIndex={-1}>
        {page === 'home' && <HomePage navigate={navigate} addProduct={addProduct} addColor={addColor} />}
        {page === 'products' && <ProductsPage addProduct={addProduct} inspect={setDetailItem} />}
        {page === 'colors' && <ColorsPage addColor={addColor} inspect={setDetailItem} />}
        {page === 'materials' && <MaterialsPage navigate={navigate} />}
        {page === 'finishes' && <FinishesPage navigate={navigate} />}
        {page === 'factory' && <FactoryPage navigate={navigate} />}
        {page === 'about' && <AboutPage navigate={navigate} />}
        {page === 'applications' && <ApplicationsPage navigate={navigate} />}
        {page === 'resources' && <ResourcesPage />}
        {page === 'partners' && <PartnersPage />}
        {page === 'contact' && <ContactPage />}
      </div>
      <Footer navigate={navigate} />
      {showBackToTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={19} /></button>}
      <RequestPanel open={requestOpen} items={requestItems} onClose={() => setRequestOpen(false)} onRemove={(id) => setRequestItems((items) => items.filter((item) => item.id !== id))} onClear={() => setRequestItems([])} />
      <DetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onAdd={() => {
          if (!detailItem) return;
          'sku' in detailItem ? addProduct(detailItem) : addColor(detailItem);
          setDetailItem(null);
        }}
      />
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
