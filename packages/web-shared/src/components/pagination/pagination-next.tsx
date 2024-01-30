import { tw } from "@/tailwind";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ComponentProps, FC } from "react";

import { PaginationLink } from "./pagination-link";

export const PaginationNext: FC<ComponentProps<typeof PaginationLink>> = ({ className, ...props }) => (
  <PaginationLink aria-label="Go to next page" className={tw("gap-1 pr-2.5", className)} size="default" {...props}>
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
);
