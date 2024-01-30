import { tw } from "@/tailwind";
import { HTMLAttributes, forwardRef } from "react";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={tw("flex flex-col space-y-1.5 p-6", className)} ref={ref} {...props} />
));
CardHeader.displayName = "CardHeader";
