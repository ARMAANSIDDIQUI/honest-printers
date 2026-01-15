export const DESIGN_SOFTWARES = {
  PHOTOSHOP: {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    extension: '.psd',
    icon: 'photoshop'
  },
  ILLUSTRATOR: {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    extension: '.ai',
    icon: 'illustrator'
  },
  CORELDRAW: {
    id: 'coreldraw',
    name: 'CorelDRAW',
    extension: '.cdr',
    icon: 'coreldraw'
  },
  INDESIGN: {
    id: 'indesign',
    name: 'Adobe InDesign',
    extension: '.indd',
    icon: 'indesign'
  }
};

export const COLOR_VARIANTS = {
  CMYK: { id: 'cmyk', name: 'CMYK', description: 'Print-ready color mode' },
  RGB: { id: 'rgb', name: 'RGB', description: 'Digital/screen color mode' },
  GRAYSCALE: { id: 'grayscale', name: 'Grayscale', description: 'Black and white' },
  SPOT: { id: 'spot', name: 'Spot Colors', description: 'Pantone/special inks' }
};

export const PRODUCT_CATEGORIES = [
  { id: 'business-cards', name: 'Business Cards', slug: 'business-cards' },
  { id: 'brochures', name: 'Brochures', slug: 'brochures' },
  { id: 'flyers', name: 'Flyers', slug: 'flyers' },
  { id: 'posters', name: 'Posters', slug: 'posters' },
  { id: 'social-media', name: 'Social Media', slug: 'social-media' },
  { id: 'logos', name: 'Logo Templates', slug: 'logos' },
  { id: 'presentations', name: 'Presentations', slug: 'presentations' },
  { id: 'banners', name: 'Banners', slug: 'banners' }
];

export const products = [
  {
    id: 'prod_001',
    name: 'Corporate Business Card Template',
    slug: 'corporate-business-card-template',
    description: 'Professional double-sided business card design with modern geometric patterns. Fully editable layers with smart objects for easy customization.',
    categoryId: 'business-cards',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80'
    ],
    featured: true,
    variants: [
      {
        id: 'var_001_ps_cmyk',
        softwareId: 'photoshop',
        colorVariantId: 'cmyk',
        price: 1499,
        originalPrice: 2499,
        fileSize: '15.2 MB',
        available: true
      },
      {
        id: 'var_001_ps_rgb',
        softwareId: 'photoshop',
        colorVariantId: 'rgb',
        price: 1299,
        originalPrice: 1999,
        fileSize: '14.8 MB',
        available: true
      },
      {
        id: 'var_001_ai_cmyk',
        softwareId: 'illustrator',
        colorVariantId: 'cmyk',
        price: 1699,
        originalPrice: 2699,
        fileSize: '8.5 MB',
        available: true
      },
      {
        id: 'var_001_cdr_cmyk',
        softwareId: 'coreldraw',
        colorVariantId: 'cmyk',
        price: 1399,
        originalPrice: 2199,
        fileSize: '12.1 MB',
        available: true
      }
    ],
    tags: ['business', 'corporate', 'minimal', 'professional'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-20T14:30:00Z'
  },
  {
    id: 'prod_002',
    name: 'Tech Startup Trifold Brochure',
    slug: 'tech-startup-trifold-brochure',
    description: 'Modern trifold brochure design perfect for tech companies and startups. Includes infographic elements and data visualization placeholders.',
    categoryId: 'brochures',
    thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80'
    ],
    featured: true,
    variants: [
      {
        id: 'var_002_id_cmyk',
        softwareId: 'indesign',
        colorVariantId: 'cmyk',
        price: 2999,
        originalPrice: 4499,
        fileSize: '45.6 MB',
        available: true
      },
      {
        id: 'var_002_ai_cmyk',
        softwareId: 'illustrator',
        colorVariantId: 'cmyk',
        price: 2799,
        originalPrice: 4199,
        fileSize: '32.4 MB',
        available: true
      },
      {
        id: 'var_002_ps_cmyk',
        softwareId: 'photoshop',
        colorVariantId: 'cmyk',
        price: 2599,
        originalPrice: 3999,
        fileSize: '58.2 MB',
        available: true
      }
    ],
    tags: ['tech', 'startup', 'brochure', 'trifold', 'modern'],
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-02-18T11:45:00Z'
  },
  {
    id: 'prod_003',
    name: 'Event Promotion Flyer Pack',
    slug: 'event-promotion-flyer-pack',
    description: 'Versatile event flyer templates for concerts, conferences, and corporate events. Includes 5 unique designs with interchangeable elements.',
    categoryId: 'flyers',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
    ],
    featured: true,
    variants: [
      {
        id: 'var_003_ps_rgb',
        softwareId: 'photoshop',
        colorVariantId: 'rgb',
        price: 1999,
        originalPrice: 3499,
        fileSize: '125.8 MB',
        available: true
      },
      {
        id: 'var_003_ps_cmyk',
        softwareId: 'photoshop',
        colorVariantId: 'cmyk',
        price: 2199,
        originalPrice: 3699,
        fileSize: '132.4 MB',
        available: true
      },
      {
        id: 'var_003_ai_cmyk',
        softwareId: 'illustrator',
        colorVariantId: 'cmyk',
        price: 2399,
        originalPrice: 3899,
        fileSize: '78.5 MB',
        available: true
      }
    ],
    tags: ['event', 'flyer', 'promotion', 'concert', 'conference'],
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-22T16:20:00Z'
  },
  {
    id: 'prod_004',
    name: 'Social Media Marketing Bundle',
    slug: 'social-media-marketing-bundle',
    description: 'Complete social media template bundle for Instagram, Facebook, LinkedIn, and Twitter. 50+ templates with consistent branding elements.',
    categoryId: 'social-media',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80'
    ],
    featured: true,
    variants: [
      {
        id: 'var_004_ps_rgb',
        softwareId: 'photoshop',
        colorVariantId: 'rgb',
        price: 4999,
        originalPrice: 7999,
        fileSize: '456.2 MB',
        available: true
      },
      {
        id: 'var_004_ai_rgb',
        softwareId: 'illustrator',
        colorVariantId: 'rgb',
        price: 4799,
        originalPrice: 7699,
        fileSize: '312.8 MB',
        available: true
      }
    ],
    tags: ['social media', 'instagram', 'facebook', 'marketing', 'bundle'],
    createdAt: '2024-02-05T10:30:00Z',
    updatedAt: '2024-02-25T09:15:00Z'
  },
  {
    id: 'prod_005',
    name: 'Minimalist Logo Collection',
    slug: 'minimalist-logo-collection',
    description: 'Curated collection of 25 minimalist logo templates. Perfect for modern brands, startups, and creative professionals.',
    categoryId: 'logos',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80'
    ],
    featured: false,
    variants: [
      {
        id: 'var_005_ai_cmyk',
        softwareId: 'illustrator',
        colorVariantId: 'cmyk',
        price: 3499,
        originalPrice: 5499,
        fileSize: '28.4 MB',
        available: true
      },
      {
        id: 'var_005_ai_rgb',
        softwareId: 'illustrator',
        colorVariantId: 'rgb',
        price: 3299,
        originalPrice: 5299,
        fileSize: '27.8 MB',
        available: true
      },
      {
        id: 'var_005_cdr_cmyk',
        softwareId: 'coreldraw',
        colorVariantId: 'cmyk',
        price: 2999,
        originalPrice: 4999,
        fileSize: '35.2 MB',
        available: true
      }
    ],
    tags: ['logo', 'minimal', 'brand', 'identity', 'collection'],
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-26T13:40:00Z'
  },
  {
    id: 'prod_006',
    name: 'Conference Poster Template',
    slug: 'conference-poster-template',
    description: 'Professional A1 and A2 poster templates for academic and corporate conferences. Includes customizable charts and data sections.',
    categoryId: 'posters',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80'
    ],
    featured: false,
    variants: [
      {
        id: 'var_006_id_cmyk',
        softwareId: 'indesign',
        colorVariantId: 'cmyk',
        price: 1899,
        originalPrice: 2899,
        fileSize: '22.6 MB',
        available: true
      },
      {
        id: 'var_006_ps_cmyk',
        softwareId: 'photoshop',
        colorVariantId: 'cmyk',
        price: 1799,
        originalPrice: 2799,
        fileSize: '45.8 MB',
        available: true
      }
    ],
    tags: ['poster', 'conference', 'academic', 'presentation'],
    createdAt: '2024-02-12T14:00:00Z',
    updatedAt: '2024-02-27T10:20:00Z'
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getProductsByCategory(categoryId) {
  return products.filter(p => p.categoryId === categoryId);
}

export function getVariantPrice(variant) {
  return {
    price: variant.price,
    originalPrice: variant.originalPrice,
    discount: Math.round((1 - variant.price / variant.originalPrice) * 100)
  };
}

export function getSoftwareInfo(softwareId) {
  return Object.values(DESIGN_SOFTWARES).find(s => s.id === softwareId) || null;
}

export function getColorVariantInfo(colorVariantId) {
  return Object.values(COLOR_VARIANTS).find(c => c.id === colorVariantId) || null;
}

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(cents);
}
