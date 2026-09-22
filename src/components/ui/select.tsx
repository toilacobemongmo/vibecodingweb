import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options?: Array<{ label: string; value: string | number }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, children, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-foreground/90"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            className={cn(
              "flex h-10 w-full appearance-none rounded-xl border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="absolute right-3 h-4 w-4 pointer-events-none text-muted-foreground" />
        </div>
        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
