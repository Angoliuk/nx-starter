"use client";

import { tw } from "@/tailwind";
import { Cancel } from "@radix-ui/react-alert-dialog";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { buttonVariants } from "../button/button";

export const AlertDialogCancel = forwardRef<ElementRef<typeof Cancel>, ComponentPropsWithoutRef<typeof Cancel>>(
  ({ className, ...props }, ref) => (
    <Cancel className={tw(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} ref={ref} {...props} />
  ),
);
AlertDialogCancel.displayName = Cancel.displayName;
