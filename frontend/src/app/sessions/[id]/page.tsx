"use client";

import { useParams } from "next/navigation";

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const sessionId = typeof params?.id === "string" ? params.id : "";

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Session</span>
          <span className="muted">{sessionId ? `Session #${sessionId}` : "Awaiting session id"}</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Session details will render here once fetched from the backend (topic, duration, meeting link, status).
        </p>
      </div>
    </div>
  );
}
