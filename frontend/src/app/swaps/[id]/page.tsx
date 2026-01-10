"use client";

import { useState } from "react";
import { SwapContractForm } from "../../../components/SwapContractForm";
import { SessionScheduler } from "../../../components/SessionScheduler";
import { Swap } from "../../../lib/types";

const mockSwap: Swap = {
  id: "swap-42",
  partner: {
    id: "user-1",
    name: "Musa R.",
    location: "Nairobi · GMT+3",
    teach: [
      { name: "C++", level: "advanced" },
      { name: "Algorithms" },
    ],
    learn: [{ name: "Python", level: "beginner" }],
    availability: [],
    rating: 4.8,
    reviews: 24,
  },
  teachMinutes: 40,
  learnMinutes: 40,
  status: "proposed",
  contractNote: "Focus on data structures in Python. In return, deep dive on modern C++.",
};

export default function SwapPage() {
  const [swap, setSwap] = useState<Swap>(mockSwap);
  const [meetingLink, setMeetingLink] = useState<string>("");

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Swap</span>
          <span className="muted">#{swap.id} with {swap.partner.name}</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Status: {swap.status}. Partner teaches {swap.partner.teach.map((s) => s.name).join(", ")} and wants to learn{" "}
          {swap.partner.learn.map((s) => s.name).join(", ")}.
        </p>
        {swap.contractNote && <p className="muted" style={{ margin: "8px 0 0" }}>{swap.contractNote}</p>}
      </div>

      <SwapContractForm
        teachSkill={swap.partner.learn[0]?.name ?? "Your skill"}
        learnSkill={swap.partner.teach[0]?.name ?? "Their skill"}
        defaultTeachMinutes={swap.teachMinutes}
        defaultLearnMinutes={swap.learnMinutes}
        defaultNote={swap.contractNote ?? ""}
        onSubmit={(contract) =>
          setSwap((prev) => ({
            ...prev,
            teachMinutes: contract.teachMinutes,
            learnMinutes: contract.learnMinutes,
            contractNote: contract.note,
          }))
        }
      />

      <SessionScheduler
        onSchedule={(payload) => {
          setMeetingLink(payload.meetingLink);
          setSwap((prev) => ({ ...prev, status: "active" }));
        }}
      />

      {meetingLink && (
        <div className="card">
          <div className="section-title">
            <span className="badge">Meeting</span>
            <span className="muted">Share with both sides</span>
          </div>
          <p className="muted">{meetingLink}</p>
        </div>
      )}
    </div>
  );
}
