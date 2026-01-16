// Helper functions for pricing and display
// Static data has been removed. Data is now fetched from the API.

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

export function getVariantPrice(variant) {
  if (!variant) return { price: 0, originalPrice: 0, discount: 0 };
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