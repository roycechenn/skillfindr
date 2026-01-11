import React from "react";
import "../styles/globals.css";
import { NavGate } from "../components/NavGate";

export const metadata = {
  title: "skillfindr",
  description: "Skill sharing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <div className="layout-container">
          <NavGate />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
