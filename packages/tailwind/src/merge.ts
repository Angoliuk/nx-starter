import { extendTailwindMerge } from "tailwind-merge";

import { AppThemeColors, FontSizes } from "./theme";

const toClassGroup = (obj: Record<string, string>) => Object.values(obj).map(x => x.slice(1));

export const tw = extendTailwindMerge({
  theme: {
    colors: Object.values(AppThemeColors),
  },
  classGroups: {
    fontVariants: [...toClassGroup(FontSizes)],
  },
  conflictingClassGroups: {
    fontVariants: ["font-size", "font-weight", "font-family", "leading"],
  },
});

export type ClassNameValue = Parameters<typeof tw>[number];
