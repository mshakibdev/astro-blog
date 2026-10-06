import type { APIRoute } from "astro";
import { getPosts } from "../../lib/posts";
export const prerender = false;
export const GET: APIRoute = async ({ cache }) => {
    cache.set({ maxAge: 60, tags: ["blog-summary"] });
    const [en, bn] = await Promise.all([getPosts("en"), getPosts("bn")]);
    return Response.json({ posts: { en: en.length, bn: bn.length }, generatedAt: new Date().toISOString() });
};
