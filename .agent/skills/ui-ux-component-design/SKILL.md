---
name: ui-ux-component-design
description: >-
  Use this skill when designing, building, or styling reusable UI components, creating design systems with Tailwind CSS, implementing micro-interactions, responsive layouts, or ensuring WCAG accessibility standards.
---

# UI/UX & Component Design Skill

This skill provides concrete patterns and guidelines for implementing high-quality, aesthetic, accessible, and responsive user interfaces.

---

## 1. Component Design Principles

1. **Design System Consistency**:
   - Use standardized color tokens (`primary`, `secondary`, `accent`, `muted`, `destructive`, `background`, `foreground`).
   - Use consistent border radii (`rounded-md`, `rounded-xl`, `rounded-full`), shadows (`shadow-sm`, `shadow-md`), and typography scales.
2. **Compound Component Pattern**:
   - For complex components (Modals, Dropdowns, Tabs, Accordions), use sub-components sharing a common context for maximum flexibility.
3. **Micro-Interactions**:
   - Provide smooth transitions on hover, focus, and state changes (`transition-all duration-200 ease-in-out`).
   - Include loading skeletons, spinner feedback, and empty states.

---

## 2. Standard Reusable Button Component Pattern (`CVA`)

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
```

---

## 3. Responsive & Dark Mode Design Checklist

- [ ] **Mobile-First Layout**: Design base classes for `< 640px` screens, then layer `sm:`, `md:`, `lg:`, `xl:`.
- [ ] **Touch Target Size**: Ensure interactive elements on mobile are at least `44x44px` with sufficient padding.
- [ ] **Dark Mode Support**: Use semantic CSS variables (e.g. `bg-card text-card-foreground`) so themes swap effortlessly.
- [ ] **Focus Management**: Ensure visible `focus-visible:ring-2` on all focusable elements for keyboard navigation.
- [ ] **Skeleton Screens**: Implement matching skeleton shapes for asynchronous loading states to eliminate layout shifts.
