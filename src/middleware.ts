import { defineMiddleware } from "astro:middleware";

// Static builds run middleware while rendering. The host serves the built files.
// public/_headers supplies equivalent headers on hosts supporting that format.
export const onRequest = defineMiddleware(async (context, next) => {
    const personal = context.url.pathname.includes("/_server-islands/") ||
        context.url.pathname.includes("/_actions/") ||
        /\/(?:bn\/)?reading-list\/?$/.test(context.url.pathname) || context.request.method !== "GET";
    if (personal) context.cache.set(false);
    const response = await next();
    if (personal) response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
});
