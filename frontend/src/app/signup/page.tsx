"use client";

import { FormEvent, useState } from "react";
import { SkillPicker } from "../../components/SkillPicker";
import { AvailabilityEditor } from "../../components/AvailabilityEditor";
import { AvailabilitySlot, SkillInterest } from "../../lib/types";
import { apiClient } from "../../lib/api";
import { saveToken } from "../../lib/auth";

const skillBank = ["Python", "C++", "React", "Design", "Public Speaking", "Spanish", "Product", "Guitar", "SQL", "Cloud"];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teach, setTeach] = useState<SkillInterest[]>([]);
  const [learn, setLearn] = useState<SkillInterest[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || password.length < 6) {
      setStatus("Name, email, and password (min 6 chars) are required.");
      return;
    }
    setSubmitting(true);
    setStatus("Creating account...");
    try {
      const res = await apiClient<{ token: string; user: { name: string; email: string } }>("/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, teach, learn, availability }),
      });
      if (res?.token) saveToken(res.token);
      setStatus("Account created. You are logged in.");
    } catch (error: any) {
      setStatus(error?.message ?? "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="stack">
      <form className="card stack" onSubmit={handleSubmit}>
        <div className="section-title">
          <span className="badge">Signup</span>
          <span className="muted">Create an account to start swapping</span>
        </div>

        <div className="grid two">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
        </div>

        <SkillPicker title="I can teach" presetSkills={skillBank} selections={teach} onChange={setTeach} />
        <SkillPicker title="I want to learn" presetSkills={skillBank} selections={learn} onChange={setLearn} />
        <AvailabilityEditor slots={availability} onChange={setAvailability} />

        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn btn-primary" type="submit">
            {submitting ? "Creating..." : "Create account"}
          </button>
          <span className="muted">Posts to /api/v1/auth/signup</span>
        </div>
        {status && <p className="muted">{status}</p>}
      </form>
    </div>
  );
}
