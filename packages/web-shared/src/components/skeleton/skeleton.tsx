import { tw } from "@/tailwind";
import { FC, HTMLAttributes } from "react";

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={tw("animate-pulse rounded-md bg-stone-900/10 dark:bg-stone-50/10", className)} {...props} />;
};
