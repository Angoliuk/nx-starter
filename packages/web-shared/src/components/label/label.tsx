"use client";

import { tw } from "@/tailwind";
import { Root } from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => <Root className={tw(labelVariants(), className)} ref={ref} {...props} />);
Label.displayName = Root.displayName;
