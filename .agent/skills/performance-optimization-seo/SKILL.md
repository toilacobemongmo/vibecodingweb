---
name: performance-optimization-seo
description: >-
  Use this skill when auditing and optimizing frontend performance (Core Web Vitals LCP, CLS, INP), configuring code splitting, dynamic imports, bundle size reduction, image optimization, or implementing SEO meta tags and structured data.
---

# Performance Optimization & SEO Skill

This skill provides actionable workflows for profiling, measuring, and maximizing frontend performance and search engine visibility.

---

## 1. Core Web Vitals Optimization Strategies

### Metric Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 1.1 Optimizing LCP
- Preload critical fonts and hero images:
  ```html
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  ```
- Use modern image formats (WebP, AVIF) with responsive `srcset` and `sizes`.
- Avoid heavy JavaScript bundles blocking initial HTML render.

### 1.2 Eliminating CLS (Cumulative Layout Shift)
- Always specify `width` and `height` or `aspect-ratio` on `<img>`, `<video>`, and `<iframe>` elements.
- Reserve height for dynamic components, advertisements, and async data with skeleton containers.

### 1.3 Improving INP (Interaction to Next Paint)
- Break up long tasks (> 50ms) using `requestIdleCallback`, Web Workers, or `scheduler.yield()`.
- Debounce high-frequency events (resize, scroll, search inputs) with a 200-300ms debounce window.

---

## 2. Code Splitting & Dynamic Imports Pattern

```tsx
import React, { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load non-critical or heavy components (Charts, Rich Text Editors, Modals)
const AnalyticsChart = lazy(() => import("@/features/analytics/components/AnalyticsChart"));

export const DashboardAnalytics = () => {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card">
      <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
      <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
        <AnalyticsChart />
      </Suspense>
    </div>
  );
};
```

---

## 3. SEO & OpenGraph Meta Tag Best Practices

```tsx
import { Helmet } from "react-helmet-async"; // Or Next.js Metadata API

interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEO: React.FC<SeoProps> = ({
  title,
  description,
  canonicalUrl = "https://yourdomain.com",
  ogImage = "https://yourdomain.com/og-image.png",
}) => {
  const fullTitle = `${title} | My App`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
```

---

## 4. Bundle Analyzer & Audit Checklist
- Run bundle analysis tool (e.g. `rollup-plugin-visualizer` or `@next/bundle-analyzer`) to inspect bundle weight.
- Replace bulky dependencies with lightweight alternatives:
  - `moment.js` -> `date-fns` or native `Intl`
  - `lodash` -> `lodash-es` or native Array methods
- Verify all static assets are served with gzip/brotli compression and `Cache-Control: public, max-age=31536000, immutable`.
