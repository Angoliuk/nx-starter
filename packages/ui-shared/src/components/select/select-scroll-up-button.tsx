"use client";
import { tw } from "@/tailwind";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { ScrollUpButton } from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const SelectScrollUpButton = forwardRef<
  ElementRef<typeof ScrollUpButton>,
  ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    className={tw("flex cursor-default items-center justify-center py-1", className)}
    ref={ref}
    {...props}
  >
    <ChevronUpIcon />
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
