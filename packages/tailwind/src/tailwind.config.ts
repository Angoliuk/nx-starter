import type { Config as TailwindConfig } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { AppThemeColors, FontSizes } from "./theme";

export type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./assets/**/*.svg"],
  theme: {
    extend: {
      keyframes: {
        "smooth-pulse": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".65",
          },
        },
      },
      animation: {
        "smooth-pulse": "smooth-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
      screens: {
        desktop: { min: "769px" },
        mobile: { max: "768px" },
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      [AppThemeColors.WHITE_1000]: "#ffffff",
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    fontSize: false as never as any,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    fontFamily: false as never as any,
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": value => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        [FontSizes.HEADLINE_S]: {
          fontSize: "17px",
          fontWeight: "510",
          lineHeight: "30px",
        },
        [FontSizes.BODY_S]: {
          fontSize: "11px",
          fontWeight: "400",
          lineHeight: "20px",
        },
      });
    }),
  ],
} satisfies TailwindConfig;
