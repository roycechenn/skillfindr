"use client";

import { useState } from "react";
import { RatingForm } from "../../../components/RatingForm";
import { Session } from "../../../lib/types";

const mockSession: Session = {
  id: "session-1",
  swapId: "swap-42",
  topic: "Python for data structures / C++ modern features",
  scheduledFor: new Date().toISOString(),
  durationMinutes: 80,
  meetingLink: "https://meet.jit.si/AppMeet-abcdef1234",
  status: "scheduled",
};

export default function SessionPage() {
  const [session, setSession] = useState<Session>(mockSession);

  const completeSession = () => {
    setSession((prev) => ({ ...prev, status: "completed" }));
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Session</span>
          <span className="muted">Swap #{session.swapId}</span>
        </div>
        <h2 style={{ margin: "4px 0" }}>{session.topic}</h2>
        <p className="muted" style={{ margin: 0 }}>
          {session.durationMinutes} minutes · {new Date(session.scheduledFor).toLocaleString()}
        </p>
        {session.meetingLink && (
          <div className="pill" style={{ width: "100%", marginTop: 12, justifyContent: "space-between" }}>
            <span>{session.meetingLink}</span>
            <button className="btn btn-ghost" type="button" onClick={() => navigator.clipboard?.writeText(session.meetingLink ?? "")}>
              Copy
            </button>
          </div>
        )}
        <div className="row" style={{ marginTop: 12, justifyContent: "space-between", alignItems: "center" }}>
          <span className="muted">Status: {session.status}</span>
          {session.status !== "completed" && (
            <button className="btn btn-primary" type="button" onClick={completeSession}>
              Mark complete
            </button>
          )}
        </div>
      </div>

      {session.status === "completed" && (
        <RatingForm
          onSubmit={({ rating, feedback }) => {
            setSession((prev) => ({ ...prev, notes: feedback }));
          }}
        />
      )}
    </div>
  );
}
