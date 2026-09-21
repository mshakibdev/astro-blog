// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        locales: ['en', 'bn'],
        defaultLocale: 'en',
        routing: { prefixDefaultLocale: false },
    },
    prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
