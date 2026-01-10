"use client";

import { FormEvent, useMemo, useState } from "react";

interface Props {
  defaultDuration?: number;
  onSchedule?: (payload: { startsAt: string; durationMinutes: number; meetingLink: string }) => void;
}

const today = new Date();

export function SessionScheduler({ defaultDuration = 60, onSchedule }: Props) {
  const [date, setDate] = useState(today.toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(defaultDuration);
  const [meetingLink, setMeetingLink] = useState("");
  const [message, setMessage] = useState("");

  const proposedStart = useMemo(() => `${date}T${time}:00`, [date, time]);

  const generateMeetingLink = () => {
    const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().replace(/-/g, "") : Math.random().toString(16).slice(2);
    const roomName = `AppMeet-${random.slice(0, 10)}`;
    const link = `https://meet.jit.si/${roomName}`;
    setMeetingLink(link);
    setMessage(`Meeting link locked in: ${link}`);
    return link;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const link = meetingLink || generateMeetingLink();
    onSchedule?.({ startsAt: proposedStart, durationMinutes: duration, meetingLink: link });
    setMessage("Session proposed. Share the link with your partner.");
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="section-title">
        <span className="badge">Schedule</span>
        <span className="muted">Pick a time and lock a Jitsi link</span>
      </div>

      <div className="grid two">
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          id="duration"
          type="number"
          min={30}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10) || defaultDuration)}
        />
      </div>

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn" type="button" onClick={generateMeetingLink}>
          Generate Jitsi link
        </button>
        <button className="btn btn-primary" type="submit">
          Send proposal
        </button>
      </div>

      {meetingLink && (
        <div className="pill" style={{ justifyContent: "space-between", width: "100%" }}>
          <span>{meetingLink}</span>
          <button className="btn btn-ghost" type="button" onClick={() => navigator.clipboard?.writeText(meetingLink)}>
            Copy
          </button>
        </div>
      )}

      {message && <p className="muted">{message}</p>}
    </form>
  );
}
