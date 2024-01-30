import { tw } from "@/tailwind";
import { ReactElement, ReactNode, memo } from "react";

export type HeaderLeftProps = {
  headerLeft?: ReactNode;
};

export const HeaderLeft = memo(({ headerLeft }: HeaderLeftProps): ReactElement | null => {
  return <div className={tw("flex items-center mobile:w-1/3")}>{headerLeft}</div>;
});
HeaderLeft.displayName = "HeaderLeft";

export type HeaderCenterProps = {
  headerCenter?: ReactNode;
  headerCenterClassName?: string;
  isHeaderCenterShown?: boolean;
};

export const HeaderCenter = memo(
  ({ headerCenter, headerCenterClassName, isHeaderCenterShown }: HeaderCenterProps): ReactElement | null => {
    return isHeaderCenterShown ? (
      <div className={tw("flex items-center mobile:w-1/3 mobile:justify-center", headerCenterClassName)}>
        {headerCenter}
      </div>
    ) : null;
  },
);
HeaderCenter.displayName = "HeaderCenter";

export type HeaderRightProps = {
  headerRight?: ReactNode;
  isHeaderRightShown?: boolean;
};

export const HeaderRight = memo(({ headerRight, isHeaderRightShown }: HeaderRightProps): ReactElement | null => {
  return isHeaderRightShown ? (
    <div className={tw("flex items-center justify-end mobile:w-1/3")}>{headerRight}</div>
  ) : null;
});
HeaderRight.displayName = "HeaderRight";
