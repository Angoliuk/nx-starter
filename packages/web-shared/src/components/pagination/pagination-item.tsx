import { tw } from "@/tailwind";
import { ComponentProps, forwardRef } from "react";

export const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li className={tw("", className)} ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";
