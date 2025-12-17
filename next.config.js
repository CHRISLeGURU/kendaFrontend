const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: function (config, { isServer }) {
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
            layers: true,
            topLevelAwait: true, // Enable top-level await for WASM modules
        };
        // Fix for MeshSDK / WebAssembly issues - explicit rule for .wasm files
        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        });

        config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
        return config;
    },
}

module.exports = withNextIntl(nextConfig);
