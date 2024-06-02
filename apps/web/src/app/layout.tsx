import { Toaster } from "@/ui-shared/components/toaster";
import { ReactNode } from "react";

import "../styles/global.css";

export const metadata = { title: "Project" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <div className="absolute bottom-10 right-10">
          <Toaster />
        </div>
      </body>
    </html>
  );
}
