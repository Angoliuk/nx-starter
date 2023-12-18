import { Config, defaultConfig } from "@nx-starter/tailwind";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./assets/**/*.svg"],
  presets: [defaultConfig],
} satisfies Config;
