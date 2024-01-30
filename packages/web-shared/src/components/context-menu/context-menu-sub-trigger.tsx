"use client";
import { tw } from "@/tailwind";
import { SubTrigger } from "@radix-ui/react-context-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ContextMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ children, className, inset, ...props }, ref) => (
  <SubTrigger
    className={tw(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-stone-100 focus:text-stone-900 data-[state=open]:bg-stone-100 data-[state=open]:text-stone-900 dark:focus:bg-stone-800 dark:focus:text-stone-50 dark:data-[state=open]:bg-stone-800 dark:data-[state=open]:text-stone-50",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </SubTrigger>
));
ContextMenuSubTrigger.displayName = SubTrigger.displayName;
