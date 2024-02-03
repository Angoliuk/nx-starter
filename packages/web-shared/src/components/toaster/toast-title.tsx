"use client";

import { tw } from "@/tailwind";
import { Title } from "@radix-ui/react-toast";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ToastTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title className={tw("text-sm font-semibold [&+div]:text-xs", className)} ref={ref} {...props} />
  ),
);
ToastTitle.displayName = Title.displayName;
