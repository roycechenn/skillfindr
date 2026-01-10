"use client";

import { useState } from "react";
import { MatchCard } from "../../components/MatchCard";
import { Match } from "../../lib/types";

const sampleMatches: Match[] = [
  {
    id: "m1",
    compatibility: 92,
    overlapMinutes: 120,
    sharedGoals: ["Prep for interview", "Pair on a project"],
    user: {
      id: "user-1",
      name: "Musa R.",
      location: "Nairobi · GMT+3",
      rating: 4.8,
      reviews: 24,
      teach: [
        { name: "C++", level: "advanced" },
        { name: "Algorithms", level: "advanced" },
      ],
      learn: [
        { name: "Python", level: "beginner" },
        { name: "Data Viz" },
      ],
      availability: [],
    },
  },
  {
    id: "m2",
    compatibility: 81,
    overlapMinutes: 90,
    user: {
      id: "user-2",
      name: "Leila P.",
      location: "Berlin · CET",
      rating: 4.6,
      reviews: 11,
      teach: [
        { name: "UI Design", level: "advanced" },
        { name: "Product Discovery" },
      ],
      learn: [{ name: "Python", level: "intermediate" }],
      availability: [],
    },
  },
];

export default function MatchesPage() {
  const [message, setMessage] = useState("Pick a partner to start a swap");

  const handlePropose = (matchId: string) => {
    const found = sampleMatches.find((m) => m.id === matchId);
    setMessage(`Proposal sent to ${found?.user.name ?? "that match"}. They will confirm the split and meeting time.`);
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Matches</span>
          <span className="muted">Teaching Python, learning C++</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          These people want what you offer and can offer what you want. We look at skill fit, timezone overlap, and goals to rank them.
        </p>
      </div>

      {sampleMatches.map((match) => (
        <MatchCard key={match.id} match={match} onPropose={handlePropose} />
      ))}

      <p className="muted">{message}</p>
    </div>
  );
}
