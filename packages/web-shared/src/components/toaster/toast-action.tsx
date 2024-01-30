"use client";

import { tw } from "@/tailwind";
import { Action } from "@radix-ui/react-toast";
import { ComponentPropsWithoutRef, ElementRef, ReactElement, forwardRef } from "react";

export type ToastActionElement = ReactElement<typeof ToastAction>;
export const ToastAction = forwardRef<ElementRef<typeof Action>, ComponentPropsWithoutRef<typeof Action>>(
  ({ className, ...props }, ref) => (
    <Action
      className={tw(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-stone-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-stone-50 group-[.destructive]:focus:ring-red-500 dark:border-stone-800 dark:hover:bg-stone-800 dark:focus:ring-stone-300 dark:group-[.destructive]:border-stone-800/40 dark:group-[.destructive]:hover:border-red-900/30 dark:group-[.destructive]:hover:bg-red-900 dark:group-[.destructive]:hover:text-stone-50 dark:group-[.destructive]:focus:ring-red-900",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
ToastAction.displayName = Action.displayName;
