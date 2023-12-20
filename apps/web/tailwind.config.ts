import { createGlobPatternsForDependencies } from "@nx/react/tailwind";
import { join } from "path";

import { Config, defaultConfig } from "../../dist/packages/tailwind/src";

export default {
  content: [
    join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./assets/**/*.svg"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [defaultConfig],
} satisfies Config;
