# Next.js App Router & React Server Component (RSC) Guidelines

This document outlines core principles, component boundaries, and performance patterns when developing with Next.js (App Router) and modern React.

---

## 1. React Server Components (RSC) vs Client Components

- **Server Components by Default**: All components in `src/app` or `src/features` are Server Components by default.
- **Push `"use client"` to the Leaves**:
  - Never mark an entire page or large container as `"use client"`.
  - Only mark the smallest necessary interactive child component (e.g. `FavoriteButton`, `SearchBarInput`, `ThemeSwitcher`) with `"use client"`.
- **Passing Server Content to Client**: Pass Server Components as `children` or props to Client Components to preserve server rendering benefits.

```tsx
// ✅ Good: Server Component wrapper with client leaf
import { ClientInteractiveModal } from "./ClientInteractiveModal";
import { fetchProductDetails } from "@/services/products";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductDetails(params.id);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>
      
      {/* Client component as an interactive leaf */}
      <ClientInteractiveModal productId={product.id} />
    </main>
  );
}
```

---

## 2. Data Fetching & Caching

- Fetch data directly in Server Components using native `fetch` or direct database / ORM queries.
- Use Next.js caching and revalidation strategies explicitly:
  ```ts
  // Static with revalidation
  const res = await fetch("https://api.example.com/items", {
    next: { revalidate: 3600, tags: ["items"] },
  });

  // Dynamic (No store)
  const resDynamic = await fetch("https://api.example.com/user/profile", {
    cache: "no-store",
  });
  ```
- Use `revalidateTag("items")` or `revalidatePath("/items")` inside Server Actions upon mutation.

---

## 3. Server Actions & Form Mutations

- Always validate inputs in Server Actions using **Zod**.
- Return structured, type-safe action results:
  ```ts
  "use server";

  import { z } from "zod";
  import { revalidateTag } from "next/cache";

  const CreateItemSchema = z.object({
    title: z.string().min(3).max(100),
  });

  export type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; error: string; fieldErrors?: Record<string, string[]> };

  export async function createItemAction(formData: FormData): Promise<ActionResult<{ id: string }>> {
    const rawData = { title: formData.get("title") };
    const validated = CreateItemSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    try {
      // Save item logic
      revalidateTag("items");
      return { success: true, data: { id: "item-123" } };
    } catch (err) {
      return { success: false, error: "Failed to create item" };
    }
  }
  ```

---

## 4. Streaming, Suspense & Loading States

- Use `loading.tsx` for route-level skeleton screens.
- Wrap slow or secondary async sections in `<Suspense fallback={<Skeleton />}>` to enable incremental streaming.
- Use `error.tsx` (Client Component) for route error boundaries with `reset()` buttons.
