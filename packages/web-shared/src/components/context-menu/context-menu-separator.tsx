"use client";
import { tw } from "@/tailwind";
import { Separator } from "@radix-ui/react-context-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ContextMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator className={tw("-mx-1 my-1 h-px bg-stone-200 dark:bg-stone-800", className)} ref={ref} {...props} />
));
ContextMenuSeparator.displayName = Separator.displayName;
