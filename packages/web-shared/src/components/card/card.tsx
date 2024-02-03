import { tw } from "@/tailwind";
import { HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    className={tw(
      "rounded-xl border border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";
