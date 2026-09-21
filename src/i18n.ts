export type Locale = "en" | "bn";
export const homeUrl = (locale: Locale) => locale === "bn" ? "/bn/" : "/";
export const ui = {
    en: { home: "Home", about: "About", latest: "Latest Posts", empty: "No posts yet. Check back soon!", allPosts: "All posts", tags: "Tags", rights: "All rights reserved." },
    bn: { home: "হোম", about: "পরিচিতি", latest: "সাম্প্রতিক লেখা", empty: "এখনো কোনো লেখা নেই। পরে আবার দেখুন!", allPosts: "সব লেখা", tags: "বিষয়", rights: "সর্বস্বত্ব সংরক্ষিত।" },
} as const;
