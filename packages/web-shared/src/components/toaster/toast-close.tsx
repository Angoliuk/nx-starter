"use client";

import { tw } from "@/tailwind";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Close } from "@radix-ui/react-toast";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ToastClose = forwardRef<ElementRef<typeof Close>, ComponentPropsWithoutRef<typeof Close>>(
  ({ className, ...props }, ref) => (
    <Close
      className={tw(
        "absolute right-1 top-1 rounded-md p-1 text-stone-950/50 opacity-0 transition-opacity hover:text-stone-950 focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-stone-50/50 dark:hover:text-stone-50",
        className,
      )}
      ref={ref}
      toast-close=""
      {...props}
    >
      <Cross2Icon className="h-4 w-4" />
    </Close>
  ),
);
ToastClose.displayName = Close.displayName;
