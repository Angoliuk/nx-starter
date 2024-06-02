"use client";

import { tw } from "@/tailwind";
import { Root } from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { FormError } from "../form-error";
import { Label } from "../label";
import { toggleVariants } from "../toggle/toggle";
import { ToggleGroupContext } from "./toggle-group-context";

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof toggleVariants> & {
    containerClassName?: string;
    error?: false | string;
    label?: string;
  };
export type ToggleGroupRef = ElementRef<typeof Root>;

export const ToggleGroup = forwardRef<ToggleGroupRef, ToggleGroupProps>(
  ({ children, className, containerClassName, error, label, size, variant, ...props }, ref) => (
    <div className={tw("max-w-full", containerClassName)}>
      {!!label && <Label>{label}</Label>}
      <Root
        className={tw("flex items-center justify-center gap-1", className)}
        ref={ref}
        {...props}
      >
        <ToggleGroupContext.Provider value={{ size, variant }}>
          {children}
        </ToggleGroupContext.Provider>
      </Root>
      <FormError className="w-full text-end" errorText={error} />
    </div>
  ),
);

ToggleGroup.displayName = Root.displayName;
