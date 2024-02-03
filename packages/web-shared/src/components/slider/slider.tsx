"use client";

import { tw } from "@/tailwind";
import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Slider = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root className={tw("relative flex w-full touch-none select-none items-center", className)} ref={ref} {...props}>
      <Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-stone-900/20 dark:bg-stone-50/20">
        <Range className="absolute h-full bg-stone-900 dark:bg-stone-50" />
      </Track>
      <Thumb className="block h-4 w-4 rounded-full border border-stone-200 border-stone-900/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 dark:border-stone-50/50 dark:border-stone-800 dark:bg-stone-950 dark:focus-visible:ring-stone-300" />
    </Root>
  ),
);
Slider.displayName = Root.displayName;
