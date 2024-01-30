import { tw } from "@/tailwind";
import { HTMLAttributes, forwardRef } from "react";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={tw("flex items-center p-6 pt-0", className)} ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";
