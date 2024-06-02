import { tw } from "@/tailwind";
import { ButtonProps, buttonVariants } from "@/ui-shared/components/button";
import { PaginationItem } from "@/ui-shared/components/pagination";
import { RouteType } from "next/dist/lib/load-custom-routes";
import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";

type PaginationLinkProps = {
  isActive?: boolean;
} & LinkProps<RouteType> &
  Omit<ComponentProps<"a">, "href"> &
  Pick<ButtonProps, "size">;

export const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
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
