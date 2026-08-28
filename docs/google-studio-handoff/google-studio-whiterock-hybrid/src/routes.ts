export type RouteId =
  | 'home'
  | 'about'
  | 'products'
  | 'colors'
  | 'factory'
  | 'finishes'
  | 'applications'
  | 'partners'
  | 'resources'
  | 'contact'
  | 'admin';

export interface RouteDefinition {
  id: RouteId;
  path: string;
  title: string;
  description: string;
  schemaType: string;
  noIndex?: boolean;
}

export const routes: RouteDefinition[] = [
  {
    id: 'home',
    path: '/',
    title: 'WHITEROCK Stone | Marble, Granite, Quartz & Custom Fabrication',
    description: 'Explore WHITEROCK marble, granite, quartz, countertops, vanity tops, architectural stone, and custom fabrication for global B2B projects.',
    schemaType: 'WebPage',
  },
  {
    id: 'about',
    path: '/about/',
    title: 'About WHITEROCK | Vietnam Stone Manufacturer',
    description: 'Learn about WHITEROCK, its Vietnam manufacturing base, capabilities, and approach to global B2B stone supply.',
    schemaType: 'AboutPage',
  },
  {
    id: 'products',
    path: '/products/',
    title: 'Stone Products | Countertops, Vanity Tops & Architectural Stone',
    description: 'Browse WHITEROCK countertop, vanity top, stone furniture, mosaic, fireplace, and architectural stone product collections.',
    schemaType: 'CollectionPage',
  },
  {
    id: 'colors',
    path: '/colors/',
    title: 'Stone Color Library | Marble, Granite & Quartz',
    description: 'Filter WHITEROCK surface colors by material, color family, finish, thickness, and available format.',
    schemaType: 'CollectionPage',
  },
  {
    id: 'factory',
    path: '/factory/',
    title: 'Vietnam Factory | WHITEROCK Stone Manufacturing',
    description: 'Review WHITEROCK manufacturing capabilities, equipment, process controls, packing, and production workflow in Vietnam.',
    schemaType: 'AboutPage',
  },
  {
    id: 'finishes',
    path: '/finishes/',
    title: 'Stone Finishes & Edge Profiles | WHITEROCK',
    description: 'Compare polished, honed, brushed, and leathered finishes plus common countertop and vanity edge profiles.',
    schemaType: 'CollectionPage',
  },
  {
    id: 'applications',
    path: '/applications/',
    title: 'Stone Applications & Project Inspiration | WHITEROCK',
    description: 'Explore stone application inspiration for kitchens, bathrooms, hospitality, retail, multi-family, and outdoor spaces.',
    schemaType: 'CollectionPage',
  },
  {
    id: 'partners',
    path: '/partners/',
    title: 'Distributor & Trade Program | WHITEROCK',
    description: 'Review the WHITEROCK distributor and trade program for importers, fabricators, builders, developers, and design partners.',
    schemaType: 'WebPage',
  },
  {
    id: 'resources',
    path: '/resources/',
    title: 'Technical Resources & Downloads | WHITEROCK',
    description: 'Access WHITEROCK catalogs, care guidance, specification resources, compliance information, and technical downloads.',
    schemaType: 'CollectionPage',
  },
  {
    id: 'contact',
    path: '/contact/',
    title: 'Contact & Request a Quote | WHITEROCK Stone',
    description: 'Contact WHITEROCK for stone product inquiries, project quotations, samples, drawings, distribution, and factory information.',
    schemaType: 'ContactPage',
  },
  {
    id: 'admin',
    path: '/admin/',
    title: 'WHITEROCK Content Admin',
    description: 'Private WHITEROCK content administration workspace.',
    schemaType: 'WebPage',
    noIndex: true,
  },
];

export const routesById = Object.fromEntries(
  routes.map((route) => [route.id, route]),
) as Record<RouteId, RouteDefinition>;

export function routePath(routeId: string): string {
  return routesById[routeId as RouteId]?.path ?? routesById.home.path;
}

export function routeIdFromLocation(location: Location = window.location): RouteId {
  const legacyHash = location.hash.replace(/^#\/?/, '').split('/')[0];
  if (legacyHash && legacyHash in routesById) {
    return legacyHash as RouteId;
  }

  const segments = location.pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);
  const lastSegment = segments.at(-1)?.replace(/\.html$/, '') ?? '';

  if (!lastSegment || lastSegment === 'index') {
    return 'home';
  }

  const match = routes.find((route) => route.id === lastSegment);
  return match?.id ?? 'home';
}
