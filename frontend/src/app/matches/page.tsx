"use client";

import { useEffect, useState } from "react";
import { MatchCard } from "../../components/MatchCard";
import { Match } from "../../lib/types";
import { isLoggedIn } from "../../lib/auth";

export default function MatchesPage() {
  const [matches] = useState<Match[]>([]);
  const [message, setMessage] = useState("No matches yet. Finish your signup to see suggestions.");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handlePropose = (matchId: string) => {
    setMessage(`Proposal sent. Swap ${matchId} will update once the backend responds.`);
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Matches</span>
          <span className="muted">Ready when your profile is saved</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          These people want what you offer and can offer what you want. We look at skill fit, timezone overlap, and goals to rank them.
        </p>
      </div>

      {!loggedIn ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            Please log in to see your matches. We will fetch them once the backend auth is wired up.
          </p>
        </div>
      ) : matches.length === 0 ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            Waiting on matches from the backend. Once your profile is saved, we’ll show ranked partners here.
          </p>
        </div>
      ) : (
        matches.map((match) => <MatchCard key={match.id} match={match} onPropose={handlePropose} />)
      )}

      {message && <p className="muted">{message}</p>}
    </div>
  );
}
