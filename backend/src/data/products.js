const products = [
  // --- Outdoor Advertising ---
  {
    name: 'Flex Banner Printing',
    slug: 'flex-banner-printing',
    description: 'High-quality flex banners for outdoor advertising and events. Weather-resistant and durable.',
    categoryId: 'outdoor-advertising',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    featured: true,
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 15, originalPrice: 25, fileSize: 'N/A', downloadUrl: '#' } // Price per sq ft usually, but using unit price for now
    ]
  },
  {
    name: 'Vinyl Printing',
    slug: 'vinyl-printing',
    description: 'Self-adhesive vinyl printing for glass, walls, and branding.',
    categoryId: 'outdoor-advertising',
    thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80',
    variants: [
      { softwareId: 'illustrator', colorVariantId: 'cmyk', price: 45, originalPrice: 60, fileSize: 'N/A', downloadUrl: '#' }
    ]
  },
  {
    name: 'Roll-up Standees',
    slug: 'roll-up-standees',
    description: 'Portable roll-up standees for exhibitions and conferences.',
    categoryId: 'outdoor-advertising',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    variants: [
      { softwareId: 'photoshop', colorVariantId: 'cmyk', price: 1800, originalPrice: 2500, fileSize: 'N/A', downloadUrl: '#' }
    ]
  },

  // --- Calendars & Diaries ---
  {
    name: 'Custom Wall Calendars',
    slug: 'custom-wall-calendars',
    description: 'Personalized wall calendars with your photos or branding.',
    categoryId: 'calendars-diaries',
    thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80',
    variants: [
      { softwareId: 'indesign', colorVariantId: 'cmyk', price: 200, originalPrice: 350, fileSize: 'N/A', downloadUrl: '#' }
    ]
  },
  {
    name: 'Table Top Calendars',
    slug: 'table-top-calendars',
    description: 'Professional desk calendars for corporate gifting.',
    categoryId: 'calendars-diaries',
    thumbnail: 'https://images.unsplash.com/photo-1633526543814-9718c8922b7f?w=600&q=80',
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 150, originalPrice: 250, fileSize: 'N/A', downloadUrl: '#' }
    ]
  },

  // --- Office Stationery (Envelopes) ---
  {
    name: 'Office Envelopes',
    slug: 'office-envelopes',
    description: 'Custom printed envelopes with logo for official correspondence.',
    categoryId: 'office-stationery',
    thumbnail: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80',
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 500, originalPrice: 800, fileSize: 'N/A', downloadUrl: '#' }
    ]
  },
  {
    name: 'Letterheads',
    slug: 'letterheads',
    description: 'Premium bond paper letterheads for professional impact.',
    categoryId: 'office-stationery',
    thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80',
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 800, originalPrice: 1200, fileSize: '5 MB', downloadUrl: '#' }
    ]
  },

  // --- Existing Items (Preserved & Enhanced) ---
  {
    name: 'Assembly Instruction Printing',
    slug: 'assembly-instruction-printing',
    description: 'Clear and precise printing for assembly instructions manuals.',
    categoryId: 'marketing-materials',
    thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80',
    variants: [
      { softwareId: 'indesign', colorVariantId: 'grayscale', price: 500, originalPrice: 800, fileSize: '5 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Barcode Labels',
    slug: 'barcode-labels',
    description: 'High-quality barcode sticker printing for inventory management.',
    categoryId: 'packaging-labels',
    thumbnail: 'https://images.unsplash.com/photo-1616401784845-180886ba9ca8?w=600&q=80',
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'grayscale', price: 200, originalPrice: 400, fileSize: '1 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Custom Bill Books',
    slug: 'custom-bill-books',
    description: 'Carbonless bill books with custom branding and numbering.',
    categoryId: 'office-stationery',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 1200, originalPrice: 1500, fileSize: '10 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Product Box Labels',
    slug: 'product-box-labels',
    description: 'Attractive and durable labels for product packaging boxes.',
    categoryId: 'packaging-labels',
    thumbnail: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&q=80',
    variants: [
      { softwareId: 'illustrator', colorVariantId: 'cmyk', price: 800, originalPrice: 1200, fileSize: '15 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Coloured Visiting Cards',
    slug: 'coloured-visiting-cards',
    description: 'Vibrant multi-colour visiting cards with premium finish.',
    categoryId: 'business-cards',
    thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80',
    featured: true,
    variants: [
      { softwareId: 'photoshop', colorVariantId: 'cmyk', price: 1000, originalPrice: 1800, fileSize: '20 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Magazine Printing',
    slug: 'magazine-printing',
    description: 'High-quality magazine printing with glossy or matte finish.',
    categoryId: 'marketing-materials',
    thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80',
    variants: [
      { softwareId: 'indesign', colorVariantId: 'cmyk', price: 5000, originalPrice: 7000, fileSize: '100 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Promotional Pamphlets',
    slug: 'promotional-pamphlets',
    description: 'Cost-effective pamphlets for mass distribution.',
    categoryId: 'marketing-materials',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
    featured: true,
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 1500, originalPrice: 2000, fileSize: '12 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Advertising Posters',
    slug: 'advertising-posters',
    description: 'Large format posters for indoor and outdoor advertising.',
    categoryId: 'marketing-materials',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    variants: [
      { softwareId: 'photoshop', colorVariantId: 'cmyk', price: 2500, originalPrice: 3500, fileSize: '50 MB', downloadUrl: '#' }
    ]
  },
  {
    name: 'Wedding Invitation Cards',
    slug: 'wedding-invitation-cards',
    description: 'Exclusive wedding card designs with premium envelopes.',
    categoryId: 'wedding-cards',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
    featured: true,
    variants: [
      { softwareId: 'coreldraw', colorVariantId: 'cmyk', price: 3000, originalPrice: 5000, fileSize: '25 MB', downloadUrl: '#' }
    ]
  },
  
  // --- Service Placeholders for "Contact for Custom Design" ---
  {
    name: 'Custom Graphic Design Service',
    slug: 'custom-graphic-design-service',
    description: 'Need a unique design? Our professional designers can create anything from logos to full branding kits. Contact us for a quote.',
    categoryId: 'printing-services',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    featured: true,
    variants: [
      { softwareId: 'illustrator', colorVariantId: 'rgb', price: 0, originalPrice: 0, fileSize: 'N/A', downloadUrl: '#' }
    ]
  }
];

module.exports = products;