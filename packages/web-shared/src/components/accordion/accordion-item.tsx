"use client";

import { tw } from "@/tailwind";
import { Item } from "@radix-ui/react-accordion";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const AccordionItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => <Item className={tw("border-b", className)} ref={ref} {...props} />,
);
AccordionItem.displayName = "AccordionItem";
