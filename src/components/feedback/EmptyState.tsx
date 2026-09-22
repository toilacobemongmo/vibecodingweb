import React from "react";
import { LucideIcon, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-border/80 bg-card/40 my-4">
      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-3 shadow-xs">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="text-base font-bold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
