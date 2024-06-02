import { Config } from "@/tailwind";
import { createGlobPatternsForDependencies } from "@nx/react/tailwind";
import { join } from "path";

// eslint-disable-next-line @nx/enforce-module-boundaries
import { defaultConfig } from "../../packages/tailwind/src/tailwind.config";

export default {
  content: [
    join(__dirname, "src/**/*.{ts,tsx,html,js,jsx}"),
    join(__dirname, "assets/**/*.svg"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [defaultConfig],
} satisfies Config;
