export interface LocaleConfig {
  id: string;
  htmlLang: string;
  hreflang: string;
  outputDir: string;
  urlPath: string;
  domain: string;
  label: string;
  switchLabel: string;
  brand: string;
  brandMark: string;
  tagline: string;
  legalName: string;
  contactId: string;
  default?: boolean;
}

export interface ProductSpec {
  SKU?: string;
  Use?: string;
  Size?: string;
  Colors?: string;
  Sink?: string;
  Edge?: string;
  MOQ?: string;
  LeadTime?: string;
  Packaging?: string;
  Backsplash?: string;
  Thickness?: string;
  Finish?: string;
  SlabSize?: string;
  Sizes?: string;
  Material?: string;
  Stone?: string;
  Base?: string;
  Surface?: string;
  Input?: string;
  Scope?: string;
  QC?: string;
  Shipping?: string;
  Contents?: string;
  Cost?: string;
}

export interface ProductItem {
  title: string;
  sku: string;
  category: string;
  material: string;
  image: string;
  description: string;
  specs: ProductSpec;
  imageWebp?: string;
  imageWidth?: number;
  imageHeight?: number;
  isIllustrative?: boolean;
  caption?: string;
  imageType?: string;
  techSheetPdf?: string;
}

export interface ColorItem {
  slug: string;
  name: string;
  material: 'Marble' | 'Granite' | 'Quartz' | 'Engineered Marble';
  colorFamily: 'White' | 'Grey' | 'Black' | 'Beige' | 'Green';
  finishes: string[];
  thicknesses: string[];
  sizes: string[];
  swatchImage: string;
  imageType: string;
  description: string;
  techSheetPdf?: string;
  relatedProducts?: string[];
  caption?: string;
}

export interface FinishItem {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageType: string;
  recommendedFor: string[];
}

export interface EdgeItem {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageType: string;
}

export interface ApplicationItem {
  title: string;
  category: string;
  description: string;
  image: string;
  imageType: string;
  caption: string;
  imageAlt: string;
  featuredColor: string;
  featuredColorSlug: string;
}

export interface EquipmentItem {
  name: string;
  function: string;
  brand: string;
  quantity: string;
  keySpec: string;
  drawing?: string;
  media: string;
  localFile?: string;
  location: string;
  imageType: string;
  alt?: string;
  caption?: string;
}

export interface FactoryGalleryItem {
  id?: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  category?: string;
  facility?: string;
  image: string;
  localFile?: string;
  imageWebp?: string;
  alt: string;
  equipment?: string;
  specs?: string;
  description?: string;
}

export interface ResourceItem {
  title: string;
  category: string;
  description: string;
  file: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
  image: string;
  imageAlt: string;
  imageType: string;
  caption: string;
}

export interface FaqItem {
  q: string;
  a: string;
  question?: string;
  answer?: string;
  category?: string;
}

export interface RfqCartItem {
  id: string;
  title: string;
  type: 'product' | 'color' | 'sample';
  sku?: string;
  material?: string;
  selectedColor?: string;
  selectedFinish?: string;
  selectedEdge?: string;
  selectedThickness?: string;
  quantity: number;
  notes?: string;
}
