export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/account/'],
        },
        sitemap: 'https://honestprinters.in/sitemap.xml',
    };
}
