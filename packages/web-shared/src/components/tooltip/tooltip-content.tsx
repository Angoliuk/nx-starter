"use client";
import { tw } from "@/tailwind";
import { Content } from "@radix-ui/react-tooltip";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const TooltipContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      className={tw(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-stone-900 px-3 py-1.5 text-xs text-stone-50 dark:bg-stone-50 dark:text-stone-900",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  ),
);
TooltipContent.displayName = Content.displayName;
