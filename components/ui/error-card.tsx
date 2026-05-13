"use client";

import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ErrorCard({
  title = "Something went wrong",
  description = "We couldn’t load this data. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Alert className="border-[#DA291C]/30">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        <span>{description}</span>
        {onRetry ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={onRetry}
            aria-label="Retry"
          >
            Retry
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

