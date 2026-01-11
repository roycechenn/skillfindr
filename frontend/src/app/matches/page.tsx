"use client";

import { useEffect, useState } from "react";
import { MatchCard } from "../../components/MatchCard";
import { Match } from "../../lib/types";
import { isLoggedIn } from "../../lib/auth";
import { apiClient } from "../../lib/api";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [message, setMessage] = useState("Loading matches...");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!loggedIn) {
        setLoading(false);
        return;
      }
      try {
        const data = await apiClient<Match[]>("/api/v1/matches");
        setMatches(data);
        setMessage(data.length ? "" : "No matches yet. Update your profile to see suggestions.");
      } catch (error: any) {
        setMessage(error?.message ?? "Failed to load matches.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [loggedIn]);

  const handlePropose = async (matchId: string) => {
    try {
      const res = await apiClient<{ meeting_link: string }>("/api/v1/matches/" + matchId + "/propose", {
        method: "POST",
      });
      setMessage(res.meeting_link ? `Meeting link: ${res.meeting_link}` : "Proposal sent.");
    } catch (error: any) {
      setMessage(error?.message ?? "Failed to propose swap.");
    }
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Matches</span>
          <span className="muted">{loggedIn ? "Personalized suggestions" : "Requires login"}</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          These people want what you offer and can offer what you want. We look at skill fit, timezone overlap, and goals to rank them.
        </p>
      </div>

      {!loggedIn ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            Please log in to see your matches.
          </p>
        </div>
      ) : loading ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            Loading matches...
          </p>
        </div>
      ) : matches.length === 0 ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            No matches yet. Update your profile and availability to get recommendations.
          </p>
        </div>
      ) : (
        matches.map((match) => <MatchCard key={match.id} match={match} onPropose={handlePropose} />)
      )}

      {message && <p className="muted">{message}</p>}
    </div>
  );
}
