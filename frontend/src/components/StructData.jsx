export default function StructData() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Honest Graphics & Printers',
        image: 'https://honestprinters.in/og-image.jpg',
        '@id': 'https://honestprinters.in',
        url: 'https://honestprinters.in',
        telephone: '+919876543210', // Replace with actual number if available, or update later
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Your Street Address', // Needs update
            addressLocality: 'Moradabad',
            addressRegion: 'UP',
            postalCode: '244001',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 28.8386,
            longitude: 78.7733,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            opens: '10:00',
            closes: '20:00',
        },
        sameAs: [
            'https://www.facebook.com/honestprinters',
            'https://www.instagram.com/honestprinters',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
