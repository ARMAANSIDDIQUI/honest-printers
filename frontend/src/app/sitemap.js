import api from "@/lib/api";

export default async function sitemap() {
    const baseUrl = 'https://honestprinters.in';

    // Static routes
    const routes = [
        '',
        '/products',
        '/categories',
        '/about',
        '/contact',
        '/faq',
        '/blog',
        '/careers',
        '/terms',
        '/privacy',
        '/refunds',
        '/license',
        '/cookies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Fetch products for dynamic routes
    let products = [];
    try {
        const { data } = await api.get('/products');
        products = data.map((product) => ({
            url: `${baseUrl}/products/${product.slug}`,
            lastModified: new Date(product.updatedAt || new Date()).toISOString(),
            changeFrequency: 'daily',
            priority: 0.9,
        }));
    } catch (error) {
        console.error("Failed to fetch products for sitemap", error);
    }

    return [...routes, ...products];
}
