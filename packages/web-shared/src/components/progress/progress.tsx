"use client";

import { tw } from "@/tailwind";
import { Indicator, Root } from "@radix-ui/react-progress";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Progress = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, value, ...props }, ref) => (
    <Root
      className={tw("relative h-2 w-full overflow-hidden rounded-full bg-stone-900/20 dark:bg-stone-50/20", className)}
      ref={ref}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 bg-stone-900 transition-all dark:bg-stone-50"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  ),
);
Progress.displayName = Root.displayName;
