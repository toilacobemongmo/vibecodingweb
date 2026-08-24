---
name: frontend-architecture-setup
description: >-
  Use this skill when initializing or structuring a modern frontend application, setting up build tools (Vite, Next.js, etc.), TypeScript configurations, path aliases, Tailwind CSS, or directory conventions.
---

# Frontend Architecture Setup Skill

This skill provides step-by-step procedures for scaffolding, configuring, and organizing modern production-ready frontend codebases.

---

## 1. Project Initialization Workflow

### Step 1: Framework & Tooling Selection
Based on project requirements:
- **Next.js (App Router)**: For fullstack capabilities, SSR/SSG, SEO-intensive apps, or dashboard platforms.
- **Vite + React (TypeScript)**: For fast, lightweight single-page applications (SPAs) or internal admin tools.
- **Vite + Vue 3 (Pinia)**: For Vue-based SPAs.

### Step 2: Essential Package Setup
Install key foundational dependencies:
```bash
# Core Utilities & Icons
npm install lucide-react clsx tailwind-merge class-variance-authority

# Form & Validation
npm install react-hook-form @hookform/resolvers zod

# State & Data Fetching
npm install @tanstack/react-query zustand axios

# Animation & UI Primitives
npm install framer-motion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot
```

### Step 3: TypeScript & Path Alias Configuration
Configure `tsconfig.json` with strict type checking and clean path aliases:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

---

## 2. Directory Structure Blueprint

Ensure the codebase follows the modular **Feature-Driven Architecture**:

```text
src/
├── app/                  # Application routing, providers, layouts
├── assets/               # Static icons, vector illustrations, images
├── components/
│   ├── ui/               # Reusable UI primitives (Button, Input, Card, Modal)
│   └── common/           # Shared compound components (Header, Footer, Sidebar)
├── features/             # Feature domain modules
│   └── [feature-name]/
│       ├── api/          # Feature API endpoints & TanStack query hooks
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature custom hooks
│       ├── types/        # Feature TypeScript interfaces
│       └── utils/        # Feature-specific utilities
├── hooks/                # Global custom hooks (useMediaQuery, useTheme)
├── lib/                  # Library configs (axios client, queryClient, utils)
├── stores/               # Global Zustand stores
├── types/                # Shared global types
└── utils/                # Pure formatting and validation helpers
```

---

## 3. Core Utility Setup (`src/lib/utils.ts`)

Create the standard class merge helper for Tailwind CSS:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 4. Verification & Health Check
- Run `npm run type-check` to ensure no TypeScript path or syntax issues exist.
- Run `npm run build` to verify the production bundle builds without errors.
