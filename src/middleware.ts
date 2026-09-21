import { defineMiddleware } from "astro:middleware";

// Static builds run middleware while rendering. The host serves the built files.
// public/_headers supplies equivalent headers on hosts supporting that format.
export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
});
