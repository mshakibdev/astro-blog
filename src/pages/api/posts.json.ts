import type { APIRoute } from "astro";
import { getPosts, postUrl } from "../../lib/posts";

export const GET: APIRoute = async () => {
    const groups = await Promise.all((["en", "bn"] as const).map(async (locale) =>
        (await getPosts(locale)).map((post) => ({
            id: post.id,
            locale,
            title: post.data.title,
            description: post.data.description,
            date: post.data.date.toISOString(),
            tags: post.data.tags,
            url: postUrl(locale, post.id),
        })),
    ));
    return Response.json({ posts: groups.flat() });
};
