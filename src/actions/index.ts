import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { getPosts } from "../lib/posts";

export const server = {
    setSaved: defineAction({
        accept: "form",
        input: z.object({
            id: z.string().min(1).max(200),
            locale: z.enum(["en", "bn"]),
            operation: z.enum(["save", "remove"]),
        }),
        handler: async ({ id, locale, operation }, { session }) => {
            if (!session) throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "Session unavailable" });
            if (!(await getPosts(locale)).some((post) => post.id === id)) {
                throw new ActionError({ code: "NOT_FOUND", message: "Post not found" });
            }
            const key = `${locale}:${id}`;
            const saved = new Set(await session.get("savedPosts") ?? []);
            if (operation === "save") {
                if (saved.size >= 100 && !saved.has(key)) throw new ActionError({ code: "BAD_REQUEST", message: "Reading list is full" });
                saved.add(key);
            } else saved.delete(key);
            session.set("savedPosts", [...saved]);
            return { locale };
        },
    }),
};
