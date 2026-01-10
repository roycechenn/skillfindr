"use client";

import { useState } from "react";
import { SkillPicker } from "../../components/SkillPicker";
import { AvailabilityEditor } from "../../components/AvailabilityEditor";
import { AvailabilitySlot, SkillInterest } from "../../lib/types";

const skillBank = ["Python", "C++", "Data Viz", "UI Design", "Product Discovery", "Public Speaking", "Guitar", "Spanish", "Cloud"];

export default function OnboardingPage() {
  const [teach, setTeach] = useState<SkillInterest[]>([{ name: "Python", level: "advanced", goal: "mentor" }]);
  const [learn, setLearn] = useState<SkillInterest[]>([{ name: "C++", level: "beginner", goal: "grasp templates" }]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { day: "Tuesday", start: "18:00", end: "19:30", timezone: "UTC" },
    { day: "Saturday", start: "15:00", end: "16:00", timezone: "UTC" },
  ]);
  const [status, setStatus] = useState("Save to see suggested partners");

  const saveOnboarding = () => {
    setStatus("Saved. Head to Matches to see suggested partners.");
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Onboarding</span>
          <span className="muted">Teach one thing, learn another</span>
        </div>
        <p className="muted" style={{ marginBottom: 0 }}>
          SkillFindr pairs people who want to learn from each other. Choose what you can offer and what you want to pick up. Then, add
          time blocks so we only show matches who overlap with you.
        </p>
      </div>

      <SkillPicker title="I can teach" presetSkills={skillBank} selections={teach} onChange={setTeach} />
      <SkillPicker title="I want to learn" presetSkills={skillBank} selections={learn} onChange={setLearn} />
      <AvailabilityEditor slots={availability} onChange={setAvailability} />

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn btn-primary" type="button" onClick={saveOnboarding}>
          Save onboarding
        </button>
        <span className="muted">{status}</span>
      </div>
    </div>
  );
}
