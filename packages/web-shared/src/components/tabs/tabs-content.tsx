"use client";
import { tw } from "@/tailwind";
import { Content } from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const TabsContent = forwardRef<ElementRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, ...props }, ref) => (
    <Content
      className={tw(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TabsContent.displayName = Content.displayName;
