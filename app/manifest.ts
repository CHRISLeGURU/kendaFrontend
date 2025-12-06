import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'KENDA - VTC & Taxi Sécurisé à Goma',
        short_name: 'KENDA',
        description: 'Réservez un taxi ou moto-taxi sécurisé à Goma en 2 clics. Chauffeurs vérifiés, paiement Mobile Money, suivi GPS. 100% Sûr.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#F0B90B',
        orientation: 'portrait',
        scope: '/',
        lang: 'fr',
        categories: ['transportation', 'travel', 'lifestyle'],
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        screenshots: [
            {
                src: '/screenshot-1.png',
                sizes: '1080x1920',
                type: 'image/png',
            },
            {
                src: '/screenshot-2.png',
                sizes: '1080x1920',
                type: 'image/png',
            },
        ],
        shortcuts: [
            {
                name: 'Commander un taxi',
                short_name: 'Taxi',
                url: '/map',
                icons: [{ src: '/icon-taxi.png', sizes: '96x96' }],
            },
            {
                name: 'Devenir chauffeur',
                short_name: 'Chauffeur',
                url: '/driver-application',
                icons: [{ src: '/icon-driver.png', sizes: '96x96' }],
            },
        ],
        related_applications: [
            {
                platform: 'play',
                url: 'https://play.google.com/store/apps/details?id=app.kenda.android',
                id: 'app.kenda.android',
            },
            {
                platform: 'itunes',
                url: 'https://apps.apple.com/app/kenda/id123456789',
            },
        ],
        prefer_related_applications: false,
    };
}
