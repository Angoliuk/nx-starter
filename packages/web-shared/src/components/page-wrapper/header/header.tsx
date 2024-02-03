import { tw } from "@/tailwind";
import { ReactNode, memo } from "react";

import {
  HeaderCenter,
  HeaderCenterProps,
  HeaderLeft,
  HeaderLeftProps,
  HeaderRight,
  HeaderRightProps,
} from "./header-parts";

export type HeaderProps = {
  header?: ReactNode;
  headerClassName?: string;
  isHeaderShown?: boolean;
} & HeaderLeftProps &
  HeaderCenterProps &
  HeaderRightProps;

export const Header = memo(
  ({
    header,
    headerCenter,
    headerCenterClassName,
    headerClassName,
    headerLeft,
    headerRight,
    isHeaderCenterShown,
    isHeaderRightShown,
    isHeaderShown,
  }: HeaderProps) => {
    if (!isHeaderShown) return null;
    return header ? (
      header
    ) : (
      <header
        className={tw(
          "h-header sticky top-0 z-50 flex w-full items-center border-b-2 border-stone-900 bg-stone-950 p-5",
          headerClassName,
        )}
      >
        <HeaderLeft headerLeft={headerLeft} />
        <HeaderCenter
          headerCenter={headerCenter}
          headerCenterClassName={headerCenterClassName}
          isHeaderCenterShown={isHeaderCenterShown}
        />
        <HeaderRight headerRight={headerRight} isHeaderRightShown={isHeaderRightShown} />
      </header>
    );
  },
);
Header.displayName = "Header";
