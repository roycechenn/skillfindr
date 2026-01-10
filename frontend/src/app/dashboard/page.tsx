"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../lib/auth";

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  if (!loggedIn) {
    return (
      <div className="card stack">
        <div className="section-title">
          <span className="badge">Dashboard</span>
          <span className="muted">Requires login</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Please <Link href="/login">log in</Link> to access your matches and swaps.
        </p>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Dashboard</span>
          <span className="muted">Welcome back</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          You are logged in. Jump to your matches, profile, or start a new swap.
        </p>
      </div>

      <div className="grid two">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Matches</h3>
          <p className="muted">See people who want to learn what you teach.</p>
          <Link className="btn btn-primary" href="/matches">
            Go to matches
          </Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <p className="muted">Update your skills and availability.</p>
          <Link className="btn" href="/profile">
            Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
}
