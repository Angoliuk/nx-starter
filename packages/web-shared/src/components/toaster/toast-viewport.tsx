"use client";

import { tw } from "@/tailwind";
import { Viewport } from "@radix-ui/react-toast";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const ToastViewport = forwardRef<ElementRef<typeof Viewport>, ComponentPropsWithoutRef<typeof Viewport>>(
  ({ className, ...props }, ref) => (
    <Viewport
      className={tw(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
ToastViewport.displayName = Viewport.displayName;
