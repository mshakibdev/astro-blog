// @ts-check
import { defineConfig, memoryCache, sessionDrivers } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    adapter: node({ mode: 'standalone' }),
    cache: { provider: memoryCache({ max: 100 }) },
    session: {
        driver: sessionDrivers.fs({ base: './.sessions' }),
        ttl: 60 * 60 * 24 * 30,
        cookie: { name: 'blog-session', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 },
    },
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
