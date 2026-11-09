import React from "react";
import { cn } from "@/lib/utils";

interface GoldRuleProps {
  className?: string;
  withSpark?: boolean;
}

export const GoldRule: React.FC<GoldRuleProps> = ({
  className,
  withSpark = true,
}) => {
  return (
    <div className={cn("relative flex items-center justify-center w-full my-6", className)}>
      <div className="h-[1px] w-full bg-sand" />
      {withSpark && (
        <div className="absolute flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 bg-orange shadow-orange-sm" />
        </div>
      )}
    </div>
  );
};
