import { z } from "astro/zod";

const releaseSchema = z.object({
    name: z.string().nullable(),
    tag_name: z.string(),
    html_url: z.url().refine((url) => url.startsWith("https://github.com/withastro/astro/releases/")),
    published_at: z.iso.datetime(),
});

// Fixed public source: no credentials or visitor-provided URLs are forwarded.
export async function getLatestRelease(fetcher: typeof fetch = fetch) {
    try {
        const response = await fetcher("https://api.github.com/repos/withastro/astro/releases/latest", {
            headers: { Accept: "application/vnd.github+json", "User-Agent": "astro-blog" },
            signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) return null;
        const result = releaseSchema.safeParse(await response.json());
        return result.success ? result.data : null;
    } catch {
        return null;
    }
}
