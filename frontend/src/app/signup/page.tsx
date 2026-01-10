"use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("Kunal");
  const [email, setEmail] = useState("kunal@example.com");
  const [teachSkill, setTeachSkill] = useState("Python");
  const [learnSkill, setLearnSkill] = useState("C++");
  const [status, setStatus] = useState("Create your SkillFindr profile");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("Account created. Head to onboarding to set availability.");
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="section-title">
        <span className="badge">Signup</span>
        <span className="muted">Share what you teach and what you want to learn</span>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="teach">I can teach</label>
          <input id="teach" value={teachSkill} onChange={(e) => setTeachSkill(e.target.value)} />
        </div>
        <div>
          <label htmlFor="learn">I want to learn</label>
          <input id="learn" value={learnSkill} onChange={(e) => setLearnSkill(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn btn-primary" type="submit">
          Create account
        </button>
        <span className="muted">You will pick time slots next.</span>
      </div>
      <p className="muted">{status}</p>
    </form>
  );
}
