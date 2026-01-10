"use client";

import { FormEvent, useState } from "react";

interface Props {
  teachSkill: string;
  learnSkill: string;
  defaultTeachMinutes?: number;
  defaultLearnMinutes?: number;
  defaultNote?: string;
  onSubmit?: (contract: { teachMinutes: number; learnMinutes: number; note: string }) => void;
}

export function SwapContractForm({
  teachSkill,
  learnSkill,
  defaultTeachMinutes = 45,
  defaultLearnMinutes = 45,
  defaultNote = "",
  onSubmit,
}: Props) {
  const [teachMinutes, setTeachMinutes] = useState(defaultTeachMinutes);
  const [learnMinutes, setLearnMinutes] = useState(defaultLearnMinutes);
  const [note, setNote] = useState(defaultNote);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.({ teachMinutes, learnMinutes, note });
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="section-title">
        <span className="badge">Swap contract</span>
        <span className="muted">Agree on time split and goals</span>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="teachMinutes">You teach {teachSkill}</label>
          <input
            id="teachMinutes"
            type="number"
            min={15}
            value={teachMinutes}
            onChange={(e) => setTeachMinutes(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div>
          <label htmlFor="learnMinutes">You learn {learnSkill}</label>
          <input
            id="learnMinutes"
            type="number"
            min={15}
            value={learnMinutes}
            onChange={(e) => setLearnMinutes(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="note">Goals or constraints</label>
        <textarea
          id="note"
          rows={3}
          placeholder="Share what a successful swap looks like for both of you."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <span className="muted">Total time: {teachMinutes + learnMinutes} minutes</span>
        <button className="btn btn-primary" type="submit">
          Save contract
        </button>
      </div>
    </form>
  );
}
