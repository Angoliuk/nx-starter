"use client";

import { tw } from "@/tailwind";
import { Root } from "@radix-ui/react-separator";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Separator = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, decorative = true, orientation = "horizontal", ...props }, ref) => (
    <Root
      className={tw(
        "shrink-0 bg-stone-200 dark:bg-stone-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  ),
);
Separator.displayName = Root.displayName;
