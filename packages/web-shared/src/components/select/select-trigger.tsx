"use client";
import { tw } from "@/tailwind";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Icon, Trigger } from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const SelectTrigger = forwardRef<ElementRef<typeof Trigger>, ComponentPropsWithoutRef<typeof Trigger>>(
  ({ children, className, ...props }, ref) => (
    <Trigger
      className={tw(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-stone-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:ring-offset-stone-950 dark:placeholder:text-stone-400 dark:focus:ring-stone-300 [&>span]:line-clamp-1",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <Icon asChild>
        <CaretSortIcon className="h-4 w-4 opacity-50" />
      </Icon>
    </Trigger>
  ),
);
SelectTrigger.displayName = Trigger.displayName;
