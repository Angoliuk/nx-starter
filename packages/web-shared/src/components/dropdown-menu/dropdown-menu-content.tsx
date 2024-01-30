"use client";
import { tw } from "@/tailwind";
import { Content, Portal } from "@radix-ui/react-dropdown-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const DropdownMenuContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        className={tw(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-stone-200 bg-white p-1 text-stone-950 shadow-md dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  ),
);
DropdownMenuContent.displayName = Content.displayName;
