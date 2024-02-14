import "@/tailwind/styles";
import { ReactNode } from "react";

import "../styles/global.css";

export const metadata = { title: "Project" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
