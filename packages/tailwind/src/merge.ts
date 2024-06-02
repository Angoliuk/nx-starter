import { extendTailwindMerge } from "tailwind-merge";

import { FontSizes, ThemeColors } from "./theme";

const toClassGroup = (obj: Record<string, string>) => Object.values(obj).map(x => x.slice(1));

export const tw = extendTailwindMerge<"fontVariants">({
  override: {
    classGroups: {
      fontVariants: [...toClassGroup(FontSizes)],
    },
    conflictingClassGroups: {
      fontVariants: ["font-size", "font-weight", "font-family", "leading"],
    },
    theme: {
      colors: Object.values(ThemeColors),
    },
  },
});

export type ClassNameValue = Parameters<typeof tw>[number];
