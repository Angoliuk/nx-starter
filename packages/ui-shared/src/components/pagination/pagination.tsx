import { tw } from "@/tailwind";
import { ComponentProps, FC } from "react";

export const Pagination: FC<ComponentProps<"nav">> = ({ className, ...props }) => (
  <nav
    aria-label="pagination"
    className={tw("mx-auto flex w-full justify-center", className)}
    role="navigation"
    {...props}
  />
);
