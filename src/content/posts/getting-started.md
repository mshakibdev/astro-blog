---
title: Getting Started With Astro
description: Learn how to build fast websites using Astro.
date: 2026-09-17
tags: [Astro, Getting started]
---

Astro is a modern framework for building fast content websites.

## Run the project

Start the development server in the background:

```bash
npm run dev -- --background
```

## Write an Astro component

An Astro component can prepare data above the template and render it as HTML:

```astro
---
const greeting = "Hello, Astro!";
---

<h1>{greeting}</h1>
```

## Add a little JavaScript

```js
const posts = ["Getting started", "Why Astro is fast"];
const titles = posts.map((title) => title.toUpperCase());
console.log(titles);
```

Use a language name after the opening code fence to highlight examples automatically.
