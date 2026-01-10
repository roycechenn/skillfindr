"use client";

import { useMemo, useState } from "react";
import { AvailabilitySlot } from "../lib/types";

interface Props {
  slots: AvailabilitySlot[];
  onChange: (slots: AvailabilitySlot[]) => void;
  timezone?: string;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AvailabilityEditor({ slots, onChange, timezone = "UTC" }: Props) {
  const [day, setDay] = useState("Tuesday");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("11:00");
  const [tz, setTz] = useState(timezone);

  const sortedSlots = useMemo(
    () =>
      [...slots].sort((a, b) => {
        if (a.day === b.day) return a.start.localeCompare(b.start);
        return days.indexOf(a.day) - days.indexOf(b.day);
      }),
    [slots]
  );

  const addSlot = () => {
    if (!day || !start || !end) return;
    if (start >= end) return;
    const duplicate = slots.find((slot) => slot.day === day && slot.start === start && slot.end === end);
    if (duplicate) return;
    onChange([...slots, { day, start, end, timezone: tz }]);
  };

  const removeSlot = (slot: AvailabilitySlot) => {
    onChange(slots.filter((s) => !(s.day === slot.day && s.start === slot.start && s.end === slot.end)));
  };

  return (
    <div className="card">
      <div className="section-title">
        <span className="badge">Availability</span>
        <span className="muted">Set when you are free to swap skills</span>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="day">Day</label>
          <select id="day" value={day} onChange={(e) => setDay(e.target.value)}>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timezone">Timezone</label>
          <input id="timezone" value={tz} onChange={(e) => setTz(e.target.value)} placeholder="UTC or America/New_York" />
        </div>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="start">Start</label>
          <input id="start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <label htmlFor="end">End</label>
          <input id="end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn btn-primary" type="button" onClick={addSlot}>
          Add block
        </button>
        <span className="muted">Blocks are saved locally for now.</span>
      </div>

      {sortedSlots.length > 0 && (
        <div className="stack" style={{ marginTop: 10 }}>
          <p className="muted">Saved blocks</p>
          <div className="grid two">
            {sortedSlots.map((slot) => (
              <div key={`${slot.day}-${slot.start}-${slot.end}`} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{slot.day}</strong>
                    <div className="muted">
                      {slot.start} → {slot.end} ({slot.timezone})
                    </div>
                  </div>
                  <button className="btn" type="button" onClick={() => removeSlot(slot)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
