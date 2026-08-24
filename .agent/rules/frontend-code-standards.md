# Frontend Code Standards & Best Practices

This document defines concrete implementation standards for frontend development across all features and components.

---

## 1. Directory & File Organization (Feature-Driven Architecture)

Recommended directory layout for scalable applications:

```text
src/
├── app/ or pages/           # Routing & entry points
├── assets/                  # Static assets (images, SVGs, fonts)
├── components/              # Shared, generic UI components (Button, Modal, Input, Table)
│   ├── ui/                  # Primitives (e.g. Radix / shadcn/ui)
│   └── feedback/            # Toast, Spinner, Skeleton, ErrorBoundary
├── features/                # Domain/Feature modules (e.g., auth, dashboard, products)
│   └── <feature_name>/
│       ├── components/      # Feature-specific UI components
│       ├── hooks/           # Feature-specific custom hooks
│       ├── services/        # API calls & data services for this feature
│       ├── types/           # Type definitions for this feature
│       └── utils/           # Helper functions for this feature
├── hooks/                   # Shared, global custom hooks (useDebounce, useMediaQuery)
├── layouts/                 # Page layouts (MainLayout, AuthLayout, DashboardLayout)
├── lib/                     # Third-party library initializations (axios, queryClient, supabase)
├── services/                # Global API clients and base configurations
├── stores/                  # Global state management stores (Zustand)
├── styles/                  # Global CSS, Tailwind themes, variables
├── types/                   # Global / common TypeScript types
└── utils/                   # Pure utility functions (formatters, date utils, validators)
```

---

## 2. Component Design Standards

### 2.1 Component Structure Template
```tsx
import { FC, memo } from 'react';
// 1. External dependencies
// 2. Internal components / primitives
// 3. Hooks / Stores / Services
// 4. Types / Constants / Utilities

export interface UserCardProps {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'member' | 'guest';
  onSelect?: (id: string) => void;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({
  id,
  name,
  avatarUrl,
  role,
  onSelect,
  className = '',
}) => {
  // 1. Custom hooks / state
  // 2. Derived state / calculations
  // 3. Event handlers
  const handleCardClick = () => {
    onSelect?.(id);
  };

  // 4. Render JSX
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      className={`flex items-center gap-3 p-4 rounded-xl border border-border bg-card transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <img
        src={avatarUrl || '/images/default-avatar.svg'}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-col">
        <span className="font-medium text-foreground text-sm">{name}</span>
        <span className="text-xs text-muted-foreground capitalize">{role}</span>
      </div>
    </div>
  );
};
```

### 2.2 Component Rules
- **Props interface**: Every component must have an explicitly named interface (e.g. `<ComponentName>Props`).
- **No inline complex logic in JSX**: Extract complex conditions or mappings into separate helper functions, sub-components, or custom hooks.
- **Default props**: Use ES6 destructuring default values instead of `defaultProps`.
- **Children typing**: Use `ReactNode` or `PropsWithChildren<T>` for components accepting children.

---

## 3. Custom Hooks Rules

- **Prefix**: Always start with `use` (e.g., `useToggle`, `useDebounce`, `useLocalStorage`).
- **Return Type**: Return objects (`{ data, isLoading, refetch }`) for 3+ values, or tuples (`[value, setValue]`) for 2 values.
- **Cleanup**: Always clean up side effects in `useEffect` (clear timeouts, remove event listeners, abort network controllers).
- **Dependency Array**: Never suppress `react-hooks/exhaustive-deps` without an explicit comment explaining why.

---

## 4. State Management Standards

1. **Local State**: Use `useState` or `useReducer` for state isolated to a single component.
2. **Lifted State**: Lift state up to the nearest common ancestor only when 2-3 sibling components need access.
3. **Global Client State**: Use **Zustand** for shared UI states (theme, active sidebar, current selected item).
4. **Server Cache State**: Use **TanStack Query** (React Query) for all asynchronous server data. Do not store server data in Zustand/Redux.
5. **URL State**: Store filtering, sorting, tab selections, and search queries in the URL query string (`?search=foo&page=2`).

---

## 5. Styling & Tailwind CSS Guidelines

- **Class Organization**: Group Tailwind classes logically:
  1. Layout & Display (`flex`, `grid`, `block`, `hidden`, `absolute`)
  2. Sizing & Spacing (`w-full`, `h-10`, `p-4`, `m-2`, `gap-3`)
  3. Typography (`text-sm`, `font-bold`, `text-foreground`, `tracking-wide`)
  4. Visuals & Borders (`bg-card`, `border`, `rounded-xl`, `shadow-sm`)
  5. Interactivity & Transitions (`transition-all`, `duration-200`, `hover:bg-accent`, `focus-visible:ring-2`)
- **Class Merging**: Use `clsx` and `tailwind-merge` (via a helper function like `cn(...)`) to handle conditional classes and prop merging cleanly.
- **Design Tokens**: Rely on theme variables (e.g. `bg-background`, `text-primary`, `border-border`) rather than hardcoded hex colors.

---

## 6. Accessibility (a11y) & SEO Checklist

- [ ] All interactive non-button elements have `role="button"` and `tabIndex={0}` plus keyboard event handlers.
- [ ] Images have descriptive `alt` tags (or `alt=""` for purely decorative images).
- [ ] Forms have associated `<label>` tags with `htmlFor` or wrapped inputs.
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for regular text, 3:1 for large text).
- [ ] Headings follow a strict hierarchy (`<h1>` -> `<h2>` -> `<h3>` without skipping levels).
- [ ] Modals and dialogs trap focus and close on `Escape`.
