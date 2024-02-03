import { tw } from "@/tailwind";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { ComponentProps, FC } from "react";

import { PaginationLink } from "./pagination-link";

export const PaginationPrevious: FC<ComponentProps<typeof PaginationLink>> = ({ className, ...props }) => (
  <PaginationLink aria-label="Go to previous page" className={tw("gap-1 pl-2.5", className)} size="default" {...props}>
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";
