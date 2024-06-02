"use client";

import { tw } from "@/tailwind";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { FormError } from "../form-error";
import { Label } from "../label";

export type CheckboxProps = {
  containerClassName?: string;
  error?: false | string;
  label?: string;
} & ComponentPropsWithoutRef<typeof Root>;

export const Checkbox = forwardRef<ElementRef<typeof Root>, CheckboxProps>(
  ({ className, containerClassName, error, label, ...props }, ref) => (
    <div className={tw("w-full", containerClassName)}>
      <div className="flex gap-4">
        {!!label && <Label>{label}</Label>}
        <Root
          className={tw(
            "border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        >
          <Indicator className={tw("relative flex items-center justify-center text-current")}>
            <CheckIcon className="stroke-white-1000 absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 *:fill-none" />
          </Indicator>
        </Root>
      </div>
      <FormError className="w-full text-end" errorText={error} />
    </div>
  ),
);
Checkbox.displayName = Root.displayName;
