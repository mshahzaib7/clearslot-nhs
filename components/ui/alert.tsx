import * as React from "react";

import { cn } from "@/lib/utils";

export function Alert({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-[hsl(var(--card-foreground))]",
        className,
      )}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("mb-1 font-semibold leading-none", className)} {...props} />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className={cn("text-sm text-[hsl(var(--muted-foreground))]", className)} {...props} />
  );
}

