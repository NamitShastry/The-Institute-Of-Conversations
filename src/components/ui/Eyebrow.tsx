import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  number?: string;
  label: string;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  number,
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-mono text-ink-soft font-semibold",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block shrink-0" />
      <span>
        {number ? (
          <span className="text-orange-deep font-bold mr-1">{number} ·</span>
        ) : null}
        {label}
      </span>
      <span className="w-5 h-[1px] bg-sand inline-block" />
    </div>
  );
};
