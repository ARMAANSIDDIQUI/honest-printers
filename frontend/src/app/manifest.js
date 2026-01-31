export default function manifest() {
    return {
        name: 'Honest Graphics & Printers',
        short_name: 'HonestPrinters',
        description: 'Premier printing and graphic design services in Moradabad.',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#4f46e5',
        icons: [
            {
                src: '/favicon.jpg',
                sizes: '192x192',
                type: 'image/jpeg',
            },
            {
                src: '/favicon.jpg',
                sizes: '512x512',
                type: 'image/jpeg',
            },
        ],
    };
}
