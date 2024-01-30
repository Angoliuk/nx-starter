import { tw } from "@/tailwind";
import { InputHTMLAttributes, forwardRef } from "react";

import { FormError } from "../form-error";
import { Label } from "../label";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  error?: false | string;
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, defaultValue = "", error, label, type, ...props }, ref) => {
    return (
      <div className={tw("max-w-full", containerClassName)}>
        {!!label && <Label>{label}</Label>}
        <input
          className={tw(
            "flex h-9 w-full rounded-md border border-stone-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300",
            className,
          )}
          ref={ref}
          type={type}
          {...props}
        />
        <FormError className="w-full text-end" errorText={error} />
      </div>
    );
  },
);
Input.displayName = "Input";
