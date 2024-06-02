import type { Config as TailwindConfig } from "tailwindcss";

import plugin from "tailwindcss/plugin";

import { FontSizes, ThemeColors } from "./theme";

export const defaultConfig = {
  plugins: [
    require("tailwindcss-animate"),
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
        [FontSizes.BODY_S]: {
          fontSize: "11px",
          fontWeight: "400",
          lineHeight: "20px",
        },
        [FontSizes.HEADLINE_S]: {
          fontSize: "17px",
          fontWeight: "510",
          lineHeight: "30px",
        },
      });
    }),
  ],
  theme: {
    extend: {
      animation: {
        "smooth-pulse": "smooth-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
      colors: {
        [ThemeColors.WHITE_1000]: "#ffffff",
        current: "currentColor",
        transparent: "transparent",
      },
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
      screens: {
        desktop: { min: "769px" },
        mobile: { max: "768px" },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fontFamily: false as never as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fontSize: false as never as any,
  },
} satisfies Omit<TailwindConfig, "content">;
