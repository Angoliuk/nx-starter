"use client";
import { tw } from "@/tailwind";
import { FC, HTMLAttributes } from "react";

export const DropdownMenuShortcut: FC<HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return <span className={tw("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
