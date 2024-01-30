"use client";
import { tw } from "@/tailwind";
import { Label } from "@radix-ui/react-context-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ContextMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    className={tw("px-2 py-1.5 text-sm font-semibold text-stone-950 dark:text-stone-50", inset && "pl-8", className)}
    ref={ref}
    {...props}
  />
));
ContextMenuLabel.displayName = Label.displayName;
