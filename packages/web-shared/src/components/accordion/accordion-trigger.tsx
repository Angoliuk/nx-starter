"use client";

import { tw } from "@/tailwind";
import { Header, Trigger } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const AccordionTrigger = forwardRef<ElementRef<typeof Trigger>, ComponentPropsWithoutRef<typeof Trigger>>(
  ({ children, className, ...props }, ref) => (
    <Header className="flex">
      <Trigger
        className={tw(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 dark:text-stone-400" />
      </Trigger>
    </Header>
  ),
);
AccordionTrigger.displayName = Trigger.displayName;
