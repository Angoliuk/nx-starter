import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const localePrefix = "never";
export const defaultLocale = "en" as const;
export const locales = [defaultLocale, "ua"] as const;

export default getRequestConfig(async ({ locale }) => {
  // @ts-expect-error locales is readonly
  if (!locales.includes(locale)) notFound();

  return {
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("./translations/en.json")
        : import(`./translations/${locale}.json`))
    ).default,
  };
});
