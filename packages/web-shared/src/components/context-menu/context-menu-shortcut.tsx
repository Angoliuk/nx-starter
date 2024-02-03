"use client";
import { tw } from "@/tailwind";
import { FC, HTMLAttributes } from "react";

export const ContextMenuShortcut: FC<HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span className={tw("ml-auto text-xs tracking-widest text-stone-500 dark:text-stone-400", className)} {...props} />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";
