# Astro Blog

## Writing a post

Add a Markdown file directly inside `src/content/posts/`, for example
`my-new-post.md`. Its filename becomes its URL: `/blog/my-new-post`.
Use lowercase, hyphen-separated filenames and do not add a `slug` override.

```md
---
title: My new post
description: A short summary for the homepage.
date: 2026-09-21
tags: [Astro, Tutorial]
---

Write your article here. Start section headings with `##` because the page
already displays the title as its main heading.
```

Title, description, and date are required and validated when Astro syncs or
builds the collection. Tags are optional. Use dates in `YYYY-MM-DD` format;
dates display in UTC so they do not shift with the server's timezone.

For an optional cover image, place the file in `public/images/` and add:

```yaml
cover:
  src: /images/my-cover.jpg
  alt: A description of the image
```

The homepage automatically lists all posts newest first. All files in this
folder are published, including future-dated posts; there is no draft mode.
Run `npm run build` and deploy the updated `dist/` folder to publish.
The original two posts remain sample content, ready for you to replace.

## Development

## Bilingual routes and navigation

English keeps `/`, `/about/` and `/blog/<id>`. Bangla uses `/bn/`,
`/bn/about/` and `/bn/blog/<id>`. Add Bangla articles directly in
`src/content/posts-bn/`, using the same schema as English posts. Matching
filenames pair articles for the language switcher. Without a matching article,
the switcher opens the other language's homepage. The Markdown demo at
`/mdpage` remains English-only. Bangla sample posts are separately authored examples.

Shared templates live in `PostList.astro` and `PostArticle.astro`; UI labels
live in `src/i18n.ts`. Dates use the page locale and UTC.

`/api/posts.json` is a public, build-time JSON endpoint containing both languages:
`{ posts: [{ id, locale, title, description, date, tags, url }] }`.
Dates are ISO strings; URLs are relative to this site. Entries are grouped by
locale, newest first within each group. Rebuild to update this static endpoint.
It is read-only and does not expose article bodies or internal file paths.

Hover prefetch is configured in `astro.config.mjs`. The shared layout uses
Astro's `ClientRouter` with a fade transition and a non-animated fallback.
Astro respects reduced-motion preferences; links still work without JavaScript.

`src/middleware.ts` adds `X-Content-Type-Options: nosniff` and
`Referrer-Policy: strict-origin-when-cross-origin`. Middleware runs during local
requests and static prerendering, not for every deployed static-file request.
`public/_headers` supplies the same headers for static hosts that support this
format (such as Netlify and Cloudflare Pages). Other hosts need equivalent
header configuration. No authentication or request-time backend was added.

## Local commands

Start the background server with `npm run dev -- --background`.
Manage it with `npm run astro -- dev status`, `npm run astro -- dev logs`, and
`npm run astro -- dev stop`.

## Original starter reference

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev --background` | Starts the background dev server at `localhost:4321` |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
