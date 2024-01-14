"use client";
import { tw } from "@nx-starter/tailwind";
import { Separator } from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const SelectSeparator = forwardRef<ElementRef<typeof Separator>, ComponentPropsWithoutRef<typeof Separator>>(
  ({ className, ...props }, ref) => (
    <Separator className={tw("-mx-1 my-1 h-px bg-stone-100 dark:bg-stone-800", className)} ref={ref} {...props} />
  ),
);
SelectSeparator.displayName = Separator.displayName;
