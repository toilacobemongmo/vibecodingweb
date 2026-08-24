---
name: frontend-testing-qa
description: >-
  Use this skill when setting up test runners (Vitest, Jest), writing Unit/Integration tests with React Testing Library, testing custom hooks, mocking API network calls with MSW, or writing E2E tests with Playwright.
---

# Frontend Testing & Quality Assurance (QA) Skill

This skill provides step-by-step guidance on setting up and implementing comprehensive testing strategies for frontend applications.

---

## 1. Testing Pyramid & Tools
- **Unit & Component Testing**: Vitest + React Testing Library + `@testing-library/user-event`
- **Hook Testing**: `@testing-library/react` (`renderHook`, `act`)
- **API Mocking**: MSW (Mock Service Worker)
- **End-to-End (E2E) Testing**: Playwright

---

## 2. Unit & Component Test Example (`UserCard.test.tsx`)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { UserCard } from "./UserCard";

describe("UserCard Component", () => {
  const mockUser = {
    id: "user-123",
    name: "Jane Doe",
    role: "admin" as const,
    avatarUrl: "/images/jane.png",
  };

  it("renders user name and role accurately", () => {
    render(<UserCard {...mockUser} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("triggers onSelect callback when clicked or activated with Enter", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<UserCard {...mockUser} onSelect={handleSelect} />);

    const card = screen.getByRole("button");
    await user.click(card);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith("user-123");
  });
});
```

---

## 3. Custom Hook Testing (`useToggle.test.ts`)

```ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle Hook", () => {
  it("initializes with default value and toggles state", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
```

---

## 4. API Mocking with MSW (`src/mocks/handlers.ts`)

```ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users/user-123", () => {
    return HttpResponse.json({
      id: "user-123",
      name: "Jane Doe",
      email: "jane@example.com",
    });
  }),
];
```

---

## 5. Playwright E2E Test Example (`e2e/auth.spec.ts`)

```ts
import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("allows user to log in successfully and view dashboard", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "user@example.com");
    await page.fill('input[name="password"]', "SecurePassword123!");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toContainText("Welcome back");
  });
});
```

---

## 6. Testing Checklist
- [ ] Test behavior and user interactions, not internal implementation details.
- [ ] Query elements using user-facing roles and accessible names (`getByRole`, `getByLabelText`).
- [ ] Mock network calls using MSW to maintain realistic testing boundaries.
- [ ] Run test suites in CI (`npm run test -- --run`) before merging PRs.
