import { tw } from "@/tailwind";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ComponentProps, FC } from "react";

export const PaginationEllipsis: FC<ComponentProps<"span">> = ({ className, ...props }) => (
  <span aria-hidden className={tw("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
