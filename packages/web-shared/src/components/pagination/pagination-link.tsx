import { tw } from "@nx-starter/tailwind";
import Link, { LinkProps } from "next/link";
import { ComponentProps, FC } from "react";

import { ButtonProps, buttonVariants } from "../button";
import { PaginationItem } from "./pagination-item";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  Omit<ComponentProps<"a">, "ref"> &
  LinkProps;

export const PaginationLink: FC<PaginationLinkProps> = ({ className, isActive, size = "icon", ...props }) => (
  <PaginationItem>
    <Link
      aria-current={isActive ? "page" : undefined}
      className={tw(
        buttonVariants({
          size,
          variant: isActive ? "outline" : "ghost",
        }),
        className,
      )}
      {...props}
    />
  </PaginationItem>
);
PaginationLink.displayName = "PaginationLink";
