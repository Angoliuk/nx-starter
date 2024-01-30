"use client";
import { tw } from "@/tailwind";
import { List } from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      className={tw(
        "inline-flex h-9 items-center justify-center rounded-lg bg-stone-100 p-1 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TabsList.displayName = List.displayName;
