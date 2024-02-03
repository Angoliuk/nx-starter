"use client";

import { tw } from "@/tailwind";
import { Fallback } from "@radix-ui/react-avatar";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const AvatarFallback = forwardRef<ElementRef<typeof Fallback>, ComponentPropsWithoutRef<typeof Fallback>>(
  ({ className, ...props }, ref) => (
    <Fallback
      className={tw(
        "flex h-full w-full items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
AvatarFallback.displayName = Fallback.displayName;
