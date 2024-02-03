"use client";

import { tw } from "@/tailwind";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { FormError } from "../form-error";
import { Label } from "../label";

export type CheckboxProps = ComponentPropsWithoutRef<typeof Root> & {
  containerClassName?: string;
  error?: false | string;
  label?: string;
};

export const Checkbox = forwardRef<ElementRef<typeof Root>, CheckboxProps>(
  ({ className, containerClassName, error, label, ...props }, ref) => (
    <div className={tw("max-w-full", containerClassName)}>
      {!!label && <Label>{label}</Label>}
      <Root
        className={tw(
          "peer h-4 w-4 shrink-0 rounded-sm border border-stone-200 border-stone-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-stone-900 data-[state=checked]:text-stone-50 dark:border-stone-50 dark:border-stone-800 dark:focus-visible:ring-stone-300 dark:data-[state=checked]:bg-stone-50 dark:data-[state=checked]:text-stone-900",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Indicator className={tw("flex items-center justify-center text-current")}>
          <CheckIcon className="h-4 w-4" />
        </Indicator>
      </Root>
      <FormError className="w-full text-end" errorText={error} />
    </div>
  ),
);
Checkbox.displayName = Root.displayName;
