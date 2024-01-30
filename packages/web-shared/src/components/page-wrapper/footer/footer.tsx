import { tw } from "@/tailwind";
import { ReactNode, memo } from "react";

export type FooterProps = {
  footer?: ReactNode;
  footerClassName?: string;
  isFooterShown?: boolean;
};

export const Footer = memo(({ footer, footerClassName, isFooterShown }: FooterProps) => {
  return isFooterShown ? (
    <div className={tw("z-50 flex w-full bg-white-1000 p-5 desktop:hidden", footerClassName)}>{footer}</div>
  ) : null;
});
Footer.displayName = "Footer";
