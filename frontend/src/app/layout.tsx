import React from "react";
import Link from "next/link";
import "../styles/globals.css";

export const metadata = {
  title: "skillfindr",
  description: "Skill sharing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <div className="layout-container">
          <header className="top-nav">
            <div className="brand">
              <span className="brand-dot" />
              <span>SkillFindr</span>
            </div>
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
              <Link href="/onboarding">Onboarding</Link>
              <Link href="/matches">Matches</Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
