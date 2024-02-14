import createMiddleware from "next-intl/middleware";

import { defaultLocale, localePrefix, locales } from "./utils/i18n/i18n";

export default createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
});

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
