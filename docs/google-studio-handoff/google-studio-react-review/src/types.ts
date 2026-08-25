export type PageId =
  | 'home'
  | 'products'
  | 'colors'
  | 'materials'
  | 'finishes'
  | 'factory'
  | 'about'
  | 'applications'
  | 'resources'
  | 'partners'
  | 'contact';

export interface SiteConfig {
  brand: string;
  legalName: string;
  tagline: string;
  productionDomain: string;
  email: string;
  tel: string;
  telHref: string;
  whatsapp: string;
  address: string;
  web3FormsAccessKey: string;
  social: Record<string, string>;
  reviewRequired: string[];
}

export interface Product {
  sku: string;
  title: string;
  category: string;
  material: string;
  summary: string;
  sizes: string[];
  options: string[];
  image: string;
  imageType: 'pending' | 'photo' | 'render';
}

export interface ColorDirection {
  slug: string;
  name: string;
  material: string;
  family: string;
  finishes: string[];
  thicknesses: string[];
  base: string;
  accent: string;
  related: string[];
}

export interface RequestItem {
  id: string;
  label: string;
  kind: 'product' | 'color';
}

export interface SimpleContent {
  name: string;
  copy: string;
}

export interface MaterialContent extends SimpleContent {
  uses: string[];
}

export interface EdgeContent extends SimpleContent {
  code: string;
}

export interface ProcessContent extends SimpleContent {
  step: string;
}

export interface ResourceContent {
  name: string;
  status: string;
  description: string;
}

export interface FaqContent {
  q: string;
  a: string;
}

export interface ContentData {
  materials: MaterialContent[];
  finishes: SimpleContent[];
  edges: EdgeContent[];
  applications: SimpleContent[];
  process: ProcessContent[];
  resources: ResourceContent[];
  faqs: FaqContent[];
}
