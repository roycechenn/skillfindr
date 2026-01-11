"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <main
      // Full screen and center everything
      className="stack"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* App title */}
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 800,
          marginBottom: "0.5rem",
        }}
      >
        Welcome to SkillFindr
      </h1>

      {/* Short tagline */}
      <p style={{fontSize: "1.25rem",marginBottom: "3rem", textAlign: "center" }}>
        Swap skills with someone who wants what you can teach.
      </p>

      {/* Actions */}
      <div
        className="row"
        style={{
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link className="btn btn-primary" href="/signup">
          Sign up
        </Link>

        <Link className="btn" href="/login">
          Log in
        </Link>
      </div>
    </main>
  );
}
