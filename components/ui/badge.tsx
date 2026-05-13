import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
        success: "bg-[#007F3B]/15 text-[#007F3B] dark:bg-[#007F3B]/25 dark:text-[#4ade80]",
        warning: "bg-[#FFB81C]/20 text-[#8a5a00] dark:bg-[#FFB81C]/20 dark:text-[#FFB81C]",
        danger: "bg-[#DA291C]/15 text-[#DA291C] dark:bg-[#DA291C]/25 dark:text-[#ff8a8a]",
        info: "bg-[#005EB8]/15 text-[#005EB8] dark:bg-[#005EB8]/25 dark:text-[#7fb6ff]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

