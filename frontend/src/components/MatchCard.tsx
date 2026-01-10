"use client";

import { Match } from "../lib/types";

interface Props {
  match: Match;
  onPropose?: (matchId: string) => void;
}

export function MatchCard({ match, onPropose }: Props) {
  const { user } = match;
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0 }}>{user.name}</h3>
          <p className="muted" style={{ margin: 0 }}>
            {user.location ?? "Remote"} · {user.rating ? `${user.rating.toFixed(1)}★ (${user.reviews ?? 0})` : "New"}
          </p>
        </div>
        <div className="pill">{match.compatibility}% match</div>
      </div>

      <div className="row" style={{ margin: "10px 0" }}>
        <div>
          <p className="muted" style={{ margin: 0 }}>
            They can teach
          </p>
          <div className="row">
            {user.teach.map((skill) => (
              <span key={skill.name} className="tag">
                {skill.name} {skill.level ? `· ${skill.level}` : ""}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="muted" style={{ margin: 0 }}>
            They want to learn
          </p>
          <div className="row">
            {user.learn.map((skill) => (
              <span key={skill.name} className="tag">
                {skill.name} {skill.level ? `· ${skill.level}` : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      {match.sharedGoals && match.sharedGoals.length > 0 && (
        <p className="muted" style={{ marginBottom: 8 }}>
          Shared goals: {match.sharedGoals.join(", ")}
        </p>
      )}

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div className="stat">
          <strong>{match.overlapMinutes} min</strong>
          <span className="muted">weekly overlap</span>
        </div>
        <div className="row">
          <button className="btn" type="button">
            View profile
          </button>
          <button className="btn btn-primary" type="button" onClick={() => onPropose?.(match.id)}>
            Propose swap
          </button>
        </div>
      </div>
    </div>
  );
}
