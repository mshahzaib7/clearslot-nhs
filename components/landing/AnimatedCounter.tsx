"use client";

import * as React from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  durationMs = 1600,
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(p);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, value]);

  return (
    <span aria-label={`Animated counter: ${value}${suffix}`}>
      {display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

