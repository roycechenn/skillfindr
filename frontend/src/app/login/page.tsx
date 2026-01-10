"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { fakeLogin } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Authenticating...");
    await fakeLogin(email, password);
    setStatus("Logged in. Redirecting to matches...");
    router.push("/matches");
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="section-title">
        <span className="badge">Login</span>
        <span className="muted">Welcome back</span>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit">
        Login
      </button>
      {status && <p className="muted">{status}</p>}
      <p className="muted">New here? Create an account</p>
    </form>
  );
}
