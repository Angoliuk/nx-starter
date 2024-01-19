import { ReactNode } from "react";

import "../styles/global.css";
import "@nx-starter/tailwind/styles";

export const metadata = {};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
