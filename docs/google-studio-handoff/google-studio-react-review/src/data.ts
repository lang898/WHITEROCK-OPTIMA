import siteConfigJson from '../data/site.config.json';
import productsJson from '../data/products.json';
import colorsJson from '../data/colors.json';
import contentJson from '../data/content.json';
import type { ColorDirection, ContentData, Product, SiteConfig } from './types';

export const siteConfig = siteConfigJson as SiteConfig;
export const products = productsJson.products as Product[];
export const colors = colorsJson.colors as ColorDirection[];
export const colorNotice = colorsJson.notice;
export const content = contentJson as ContentData;

export const productCategories = [...new Set(products.map((product) => product.category))];
export const colorFamilies = [...new Set(colors.map((color) => color.family))];
export const colorMaterials = [...new Set(colors.map((color) => color.material))];
