import { getCollection, type CollectionEntry } from "astro:content";
import { homeUrl, type Locale } from "../i18n";

export type Post = CollectionEntry<"posts"> | CollectionEntry<"postsBn">;
export async function getPosts(locale: Locale): Promise<Post[]> {
    const posts: Post[] = locale === "bn"
        ? await getCollection("postsBn") : await getCollection("posts");
    return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}
export const postUrl = (locale: Locale, id: string) => `${homeUrl(locale)}blog/${id}`;
