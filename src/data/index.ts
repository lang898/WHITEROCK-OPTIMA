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
export const faqList: FaqItem[] = ((faqData as any).items || []).map((item: any) => ({
  q: item.question || item.q || '',
  a: item.answer || item.a || '',
  question: item.question || item.q || '',
  answer: item.answer || item.a || '',
  category: item.category || 'General Procurement'
})) as FaqItem[];
export const faqIntro: string = (faqData as any).intro || 'Common questions from wholesale, project, and distributor buyers.';
export const lookbook = lookbookData.items;
export const projects = projectsData.items;
export const locales: LocaleConfig[] = localesData.locales as LocaleConfig[];
export const siteConfig = siteConfigData;
