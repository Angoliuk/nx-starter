import { ReactNode } from "react";

import { locales } from "../../utils/i18n/i18n";

export const metadata = { title: "Project" };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: (typeof locales)[number] };
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
