"use client";
import { tw } from "@/tailwind";
import { Content } from "@radix-ui/react-hover-card";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const HoverCardContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ align = "center", className, sideOffset = 4, ...props }, ref) => (
    <Content
      align={align}
      className={tw(
        "z-50 w-64 rounded-md border border-stone-200 bg-white p-4 text-stone-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  ),
);
HoverCardContent.displayName = Content.displayName;
