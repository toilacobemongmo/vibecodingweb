# Frontend Project Guidelines & Rules

Welcome to the frontend project! All code, architecture decisions, and implementations in this workspace must adhere to the following standards.

---

## 1. Core Principles & Architecture
- **Clean Architecture & Modularity**: Structure code by domain/features (`src/features/...`) or clear layer boundaries (`src/components`, `src/hooks`, `src/services`, `src/stores`, `src/types`, `src/utils`).
- **Separation of Concerns**:
  - **Presentational Layer (UI)**: Pure visual components with minimal business logic.
  - **Logic Layer (Hooks / Composables)**: Reusable stateful logic extracted into custom hooks.
  - **Data/Service Layer (API)**: Network calls, data transforms, and API clients isolated from components.
  - **State Layer**: Server state managed via TanStack Query / SWR; client state managed via Zustand / React Context / Pinia.
- **Single Responsibility Principle (SRP)**: Keep components focused, concise (< 200 lines recommended), and easily testable.

---

## 2. TypeScript & Type Safety
- **Strict Typing**: Always use TypeScript in strict mode. Avoid `any` at all costs; use `unknown`, generics, or proper type unions.
- **Explicit Interfaces & Props**: Define clear interfaces/types for all component props, API payloads, and state models.
- **Runtime Validation**: Use Zod or Valibot for validating API responses, query params, and form inputs.
- **Consistent Export/Import**: Prefer explicit named exports over default exports for components and utilities (except dynamic route pages where required).

---

## 3. UI/UX, Styling & Accessibility (a11y)
- **Styling Standards**:
  - Prefer **Tailwind CSS** or modern CSS Modules with consistent design tokens (colors, spacing, typography, radii).
  - Adopt a **Mobile-First** responsive approach (`sm:`, `md:`, `lg:`, `xl:`).
  - Support **Dark Mode** seamlessly via CSS variables or utility classes (`dark:`).
- **Accessibility (WCAG 2.1 AA)**:
  - Use semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<article>`, `<button>`, `<dialog>`).
  - Add explicit `aria-label`, `aria-expanded`, and keyboard navigation support (`Tab`, `Enter`, `Escape`) to interactive elements.
  - Ensure high contrast ratios and visible focus rings (`focus-visible:ring-...`).
- **Micro-interactions & UX Polish**:
  - Provide instant visual feedback for user actions (hover states, active states, loading spinners, skeleton placeholders).
  - Prevent layout shifts (CLS) by giving images and async content fixed aspect ratios or reserved container heights.

---

## 4. State Management & Data Fetching
- **Server State vs. Client State**:
  - **Server State**: Use **TanStack Query** (React Query) / SWR for caching, background refetching, pagination, and optimistic updates. Never duplicate server state in global stores.
  - **Client / UI State**: Use lightweight stores like **Zustand** or URL query parameters for modal visibility, filters, active tabs, and preferences.
- **URL as Source of Truth**: For filterable lists, search, tabs, and pagination, synchronize state with URL search params whenever possible.

---

## 5. Performance Optimization & Core Web Vitals
- **Code Splitting & Lazy Loading**: Use dynamic imports (`React.lazy`, `next/dynamic`) for heavy modals, charts, and route components.
- **Asset Optimization**: Use modern formats (WebP/AVIF, SVG for icons). Implement responsive image sizes and explicit `width`/`height` or aspect-ratio to eliminate CLS.
- **Avoid Unnecessary Re-renders**: Keep state localized to the components that need it. Memoize expensive calculations (`useMemo`) or callback references (`useCallback`) when passing to memoized child components.

---

## 6. Error Handling & Resilience
- **Error Boundaries**: Wrap major application sections and route pages with Error Boundaries with user-friendly fallback screens.
- **Graceful Degradation**: Handle offline state, failed network requests, and empty data states with helpful messages and retry actions.
- **Safe Async Handling**: Always use `try/catch` or query error hooks (`isError`, `error`) and provide user feedback via toast notifications.

---

## 7. Code Quality, Naming & Tooling
- **Naming Conventions**:
  - Components: `PascalCase` (e.g., `UserProfileCard.tsx`)
  - Hooks: `camelCase` starting with `use` (e.g., `useDebounce.ts`, `useAuth.ts`)
  - Utilities / Services: `camelCase` (e.g., `formatCurrency.ts`, `authService.ts`)
  - Types / Interfaces: `PascalCase` (e.g., `UserData`, `ApiResponse<T>`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`, `DEFAULT_PAGE_SIZE`)
- **Formatting & Linting**: Strictly adhere to Prettier and ESLint configurations. Never bypass linter warnings with inline disables without documented justification.
