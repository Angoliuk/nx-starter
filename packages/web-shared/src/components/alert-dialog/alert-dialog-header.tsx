"use client";

import { tw } from "@/tailwind";
import { FC, HTMLAttributes } from "react";

export const AlertDialogHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={tw("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";
