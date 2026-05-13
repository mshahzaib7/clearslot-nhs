"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Hero3DCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000 w-full flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={cn(
          "preserve-3d transition-transform duration-200 ease-out",
          className
        )}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <div className="preserve-3d">
          {children}
        </div>
      </div>
    </div>
  );
}
