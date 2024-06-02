"use client";

import { tw } from "@/tailwind";
import { Root, Thumb } from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { FormError } from "../form-error";
import { Label } from "../label";

export type SwitchProps = ComponentPropsWithoutRef<typeof Root> & {
  containerClassName?: string;
  error?: false | string;
  label?: string;
};

export const Switch = forwardRef<ElementRef<typeof Root>, SwitchProps>(
  ({ className, containerClassName, error, label, ...props }, ref) => (
    <div className={tw("max-w-full", containerClassName)}>
      {!!label && <Label>{label}</Label>}
      <Root
        className={tw(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-stone-900 data-[state=unchecked]:bg-stone-200 dark:focus-visible:ring-stone-300 dark:focus-visible:ring-offset-stone-950 dark:data-[state=checked]:bg-stone-50 dark:data-[state=unchecked]:bg-stone-800",
          className,
        )}
        {...props}
        ref={ref}
      >
        <Thumb
          className={tw(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-stone-950",
          )}
        />
      </Root>
      <FormError className="w-full text-end" errorText={error} />
    </div>
  ),
);
Switch.displayName = Root.displayName;
