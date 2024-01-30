"use client";

import { tw } from "@/tailwind";
import { Corner, Root, Viewport } from "@radix-ui/react-scroll-area";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { ScrollBar } from "./scroll-bar";

export const ScrollArea = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ children, className, ...props }, ref) => (
    <Root className={tw("relative overflow-hidden", className)} ref={ref} {...props}>
      <Viewport className="h-full w-full rounded-[inherit]">{children}</Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  ),
);
ScrollArea.displayName = Root.displayName;
