import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        date: z.coerce.date(),
        tags: z.array(z.string().trim().min(1)).default([]),
        cover: z.object({
            src: z.string().regex(/^\/(?!\/)/, "Use an image path from public, starting with /"),
            alt: z.string().trim().min(1),
        }).optional(),
    }),
});

export const collections = { posts };
