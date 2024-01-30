"use client";

import { tw } from "@/tailwind";
import { Action } from "@radix-ui/react-alert-dialog";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { buttonVariants } from "../button/button";

export const AlertDialogAction = forwardRef<ElementRef<typeof Action>, ComponentPropsWithoutRef<typeof Action>>(
  ({ className, ...props }, ref) => <Action className={tw(buttonVariants(), className)} ref={ref} {...props} />,
);
AlertDialogAction.displayName = Action.displayName;
