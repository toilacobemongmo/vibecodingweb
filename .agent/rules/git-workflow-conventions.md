# Git & Code Review Conventions

This document outlines the version control and collaboration rules for the project.

---

## 1. Commit Message Convention (Conventional Commits)

Format: `<type>(<optional scope>): <description>`

### Types:
- `feat`: A new user-facing feature or capability
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries (e.g. dependency updates)

### Examples:
- `feat(auth): implement oauth2 google login and token refresh`
- `fix(checkout): resolve cart total calculation when discount code is applied`
- `perf(images): implement dynamic next/image optimization and blur placeholders`
- `refactor(components): extract reusable modal dialog into ui primitives`

---

## 2. Branch Naming Convention

- `feature/<ticket-or-feature-name>` (e.g. `feature/user-profile-settings`)
- `fix/<issue-name>` (e.g. `fix/mobile-nav-overflow`)
- `refactor/<module-name>` (e.g. `refactor/api-client-layer`)
- `chore/<task-name>` (e.g. `chore/upgrade-tailwind-v4`)

---

## 3. Pull Request (PR) & Verification Checklist

Before submitting or merging any frontend code:
1. **Lint & Type Check**: Ensure `npm run lint` and `npm run type-check` (or `tsc --noEmit`) pass with zero errors and zero warnings.
2. **Build Verification**: Run `npm run build` to ensure production bundle compiles cleanly.
3. **Responsive Testing**: Verify layouts at mobile (375px), tablet (768px), and desktop (1280px+).
4. **Console Hygiene**: Ensure no lingering `console.log`, uncaught promise errors, or React hydration warnings appear in the console.
