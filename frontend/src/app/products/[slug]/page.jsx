import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import api from "@/lib/api";

// Fetch product data
async function getProduct(slug) {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  } catch (error) {
    return null;
  }
}

// Generate Metadata
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Honest Graphics & Printers",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Honest Graphics & Printers`,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.thumbnail,
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Honest Graphics & Printers',
    },
    offers: {
      '@type': 'Offer',
      url: `https://honestprinters.in/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.variants?.[0]?.price || 0,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors selection:bg-indigo-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StarryBackground />
      <Navbar />
      <main className="relative pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
}