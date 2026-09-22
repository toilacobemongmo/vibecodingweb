import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border-border",
        optimal:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium",
        normal:
          "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium",
        critical:
          "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 font-medium",
        pulse:
          "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium",
        purple:
          "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
