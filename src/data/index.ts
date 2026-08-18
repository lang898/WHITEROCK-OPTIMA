import productsData from '../../data/products.json';
import colorsData from '../../data/colors.json';
import finishesData from '../../data/finishes.json';
import edgesData from '../../data/edges.json';
import applicationsData from '../../data/applications.json';
import factoryData from '../../data/factory.json';
import companyData from '../../data/company.json';
import pagesData from '../../data/pages.json';
import partnersData from '../../data/partners.json';
import resourcesData from '../../data/resources.json';
import newsData from '../../data/news.json';
import faqData from '../../data/faq.json';
import lookbookData from '../../data/lookbook.json';
import projectsData from '../../data/projects.json';
import localesData from '../../data/locales.json';
import siteConfigData from '../../data/site.config.json';
import type {
  ProductItem,
  ColorItem,
  FinishItem,
  EdgeItem,
  ApplicationItem,
  EquipmentItem,
  FactoryGalleryItem,
  ResourceItem,
  NewsItem,
  FaqItem,
  LocaleConfig
} from '../types';

export const products: ProductItem[] = productsData.products as ProductItem[];
export const colors: ColorItem[] = colorsData.colors as ColorItem[];
export const finishes: FinishItem[] = finishesData.finishes as FinishItem[];
export const edges: EdgeItem[] = edgesData.edges as EdgeItem[];
export const applications: ApplicationItem[] = applicationsData.items as ApplicationItem[];
export const factory = factoryData;
export const company = companyData;
export const pages = pagesData;
export const partners = partnersData;
export const resources: ResourceItem[] = resourcesData.items as ResourceItem[];
export const news: NewsItem[] = newsData.items as NewsItem[];
export const faqList: FaqItem[] = (faqData.items || [
  {
    q: "What is WHITEROCK's production base and capacity?",
    a: "WHITEROCK operates a 20,000 m² primary manufacturing facility in Dong Nai Province, Vietnam, with over 100,000 m² annual capacity, backed by our founding factory OPTIMA STONE in Yunfu, China for secondary support and specialty natural stone."
  },
  {
    q: "What are your minimum order quantities (MOQs)?",
    a: "For standard bathroom vanity programs (24\", 31\", 49\", 61\"), MOQ starts at 10–20 pcs per color/size. Kitchen countertops and cut-to-size commercial orders are quoted per drawing schedule."
  },
  {
    q: "How do I request material samples or a sample kit?",
    a: "You can request individual 4x4 inch stone chips or our complete 6–12 color Master Sample Box (WR-SM) via our RFQ builder. Sample dispatch lead time is 7–15 days by express courier."
  },
  {
    q: "What export packaging standards do you provide?",
    a: "Every piece is protected with high-density EPE foam, heavy-duty corner guards, individual inner boxes, and fumigated solid plywood export crates or reinforced A-frames designed for container loading."
  },
  {
    q: "Can third-party inspection companies (SGS, BV, Intertek) inspect orders?",
    a: "Yes. We welcome customer-appointed inspectors or third-party agencies (SGS, Bureau Veritas, Intertek) at our Vietnam and China factories prior to container loading."
  }
]) as FaqItem[];
export const lookbook = lookbookData.items;
export const projects = projectsData.items;
export const locales: LocaleConfig[] = localesData.locales as LocaleConfig[];
export const siteConfig = siteConfigData;
