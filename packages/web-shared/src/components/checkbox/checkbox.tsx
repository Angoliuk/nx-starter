"use client";

import { tw } from "@nx-starter/tailwind";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const Checkbox = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root
      className={tw(
        "peer h-4 w-4 shrink-0 rounded-sm border border-stone-200 border-stone-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-stone-900 data-[state=checked]:text-stone-50 dark:border-stone-800 dark:border-stone-50 dark:focus-visible:ring-stone-300 dark:data-[state=checked]:bg-stone-50 dark:data-[state=checked]:text-stone-900",
        className,
      )}
      ref={ref}
      {...props}
    >
      <Indicator className={tw("flex items-center justify-center text-current")}>
        <CheckIcon className="h-4 w-4" />
      </Indicator>
    </Root>
  ),
);
Checkbox.displayName = Root.displayName;
