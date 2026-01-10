"use client";

import { useParams } from "next/navigation";

export default function SwapPage() {
  const params = useParams<{ id: string }>();
  const swapId = typeof params?.id === "string" ? params.id : "";

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Swap</span>
          <span className="muted">{swapId ? `Swap #${swapId}` : "Awaiting swap id"}</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Swap details will load here once connected to the backend. Include partner info, time split, and status.
        </p>
      </div>
    </div>
  );
}
