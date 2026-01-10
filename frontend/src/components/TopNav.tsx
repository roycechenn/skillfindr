"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isLoggedIn, clearToken } from "../lib/auth";

export function TopNav() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setLoggedIn(isLoggedIn());
    check();
    window.addEventListener("storage", check);
    window.addEventListener("auth-change", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("auth-change", check);
    };
  }, []);

  return (
    <header className="top-nav">
      <div className="brand">
        <span className="brand-dot" />
        <span>SkillFindr</span>
      </div>
      <nav className="nav-links">
        <Link href="/">Home</Link>
        {loggedIn ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/matches">Matches</Link>
            <Link href="/profile">Profile</Link>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                clearToken();
                setLoggedIn(false);
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
            <Link href="/matches">Matches</Link>
          </>
        )}
      </nav>
    </header>
  );
}
