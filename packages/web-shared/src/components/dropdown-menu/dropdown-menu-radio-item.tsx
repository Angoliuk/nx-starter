"use client";
import { tw } from "@/tailwind";
import { ItemIndicator, RadioItem } from "@radix-ui/react-dropdown-menu";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ children, className, ...props }, ref) => (
  <RadioItem
    className={tw(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-stone-100 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800 dark:focus:text-stone-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;
