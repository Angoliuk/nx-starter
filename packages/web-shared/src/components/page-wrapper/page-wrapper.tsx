import { tw } from "@/tailwind";
import { FC, ReactNode } from "react";

import { Footer, FooterProps } from "./footer/footer";
import { Header, HeaderProps } from "./header/header";

export type PageWrapperProps = {
  children: ReactNode;
  className?: string;
  contentWrapperClassName?: string;
  isShown?: boolean;
} & HeaderProps &
  FooterProps;

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className,
  contentWrapperClassName,
  footer,
  footerClassName,
  header,
  headerCenter,
  headerCenterClassName,
  headerClassName,
  headerLeft,
  headerRight,
  isFooterShown,
  isHeaderCenterShown = true,
  isHeaderRightShown = true,
  isHeaderShown = true,
  isShown = true,
}) => {
  return isShown ? (
    <div className={tw("flex h-full min-h-full w-full flex-1 flex-col bg-stone-950", className)}>
      <Header
        header={header}
        headerCenter={headerCenter}
        headerCenterClassName={headerCenterClassName}
        headerClassName={headerClassName}
        headerLeft={headerLeft}
        headerRight={headerRight}
        isHeaderCenterShown={isHeaderCenterShown}
        isHeaderRightShown={isHeaderRightShown}
        isHeaderShown={isHeaderShown}
      />
      <main
        className={tw(
          "flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto scroll-smooth",
          contentWrapperClassName,
        )}
        role="main"
      >
        {children}
      </main>
      <Footer footer={footer} footerClassName={footerClassName} isFooterShown={isFooterShown} />
    </div>
  ) : (
    children
  );
};
