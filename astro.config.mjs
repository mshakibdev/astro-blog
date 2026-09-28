// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    adapter: node({ mode: 'standalone' }),
    integrations: [react()],
    markdown: {
        shikiConfig: { theme: 'github-dark', wrap: false },
    },
    i18n: {
        locales: ['en', 'bn'],
        defaultLocale: 'en',
        routing: { prefixDefaultLocale: false },
    },
    prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
