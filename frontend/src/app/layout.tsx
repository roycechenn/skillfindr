import React from "react";
import "../styles/globals.css";
import { TopNav } from "../components/TopNav";

export const metadata = {
  title: "skillfindr",
  description: "Skill sharing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <div className="layout-container">
          <TopNav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
