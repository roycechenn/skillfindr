"use client";

import { useState } from "react";
import { SkillInterest, SkillLevel } from "../lib/types";

interface SkillPickerProps {
  title: string;
  presetSkills: string[];
  selections: SkillInterest[];
  onChange: (skills: SkillInterest[]) => void;
}

const levels: SkillLevel[] = ["beginner", "intermediate", "advanced"];

export function SkillPicker({ title, presetSkills, selections, onChange }: SkillPickerProps) {
  const [draftSkill, setDraftSkill] = useState("");
  const [draftLevel, setDraftLevel] = useState<SkillLevel>("intermediate");
  const [draftGoal, setDraftGoal] = useState("");

  const toggleSkill = (skill: string) => {
    const exists = selections.find((s) => s.name.toLowerCase() === skill.toLowerCase());
    if (exists) {
      onChange(selections.filter((s) => s.name.toLowerCase() !== skill.toLowerCase()));
    } else {
      onChange([...selections, { name: skill, level: "intermediate" }]);
    }
  };

  const addCustomSkill = () => {
    if (!draftSkill.trim()) return;
    const skill = draftSkill.trim();
    const existingIndex = selections.findIndex((s) => s.name.toLowerCase() === skill.toLowerCase());
    const updated = [...selections];
    const payload: SkillInterest = {
      name: skill,
      level: draftLevel,
      goal: draftGoal || undefined,
    };

    if (existingIndex >= 0) {
      updated[existingIndex] = payload;
    } else {
      updated.push(payload);
    }

    onChange(updated);
    setDraftSkill("");
    setDraftGoal("");
  };

  return (
    <div className="card">
      <div className="section-title">
        <span className="badge">{title}</span>
        <span className="muted">Select what you want to cover</span>
      </div>

      <div className="stack">
        <div className="row">
          {presetSkills.map((skill) => {
            const active = selections.some((s) => s.name.toLowerCase() === skill.toLowerCase());
            return (
              <button
                key={skill}
                className={`btn ${active ? "btn-primary" : "btn-ghost"}`}
                onClick={() => toggleSkill(skill)}
                type="button"
              >
                {active ? "✓ " : "＋ "}
                {skill}
              </button>
            );
          })}
        </div>

        <div className="grid two">
          <div>
            <label htmlFor={`${title}-skill`}>Add a skill</label>
            <input
              id={`${title}-skill`}
              placeholder="Ex: Public speaking"
              value={draftSkill}
              onChange={(e) => setDraftSkill(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${title}-level`}>Level</label>
            <select
              id={`${title}-level`}
              value={draftLevel}
              onChange={(e) => setDraftLevel(e.target.value as SkillLevel)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={`${title}-goal`}>Goal (optional)</label>
          <input
            id={`${title}-goal`}
            placeholder="Ship a small project, pass an interview, teach a friend..."
            value={draftGoal}
            onChange={(e) => setDraftGoal(e.target.value)}
          />
        </div>

        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <button className="btn btn-primary" type="button" onClick={addCustomSkill}>
            Save skill
          </button>
          <span className="muted">You can save and then remove if you change your mind.</span>
        </div>

        {selections.length > 0 && (
          <div className="stack">
            <p className="muted">Selected</p>
            <div className="row">
              {selections.map((skill) => (
                <span className="tag" key={skill.name}>
                  {skill.name}
                  {skill.level ? ` · ${skill.level}` : ""}
                  {skill.goal ? ` · ${skill.goal}` : ""}
                  <button
                    aria-label="Remove skill"
                    className="btn btn-ghost"
                    style={{ padding: "4px 8px", borderRadius: "8px" }}
                    type="button"
                    onClick={() => toggleSkill(skill.name)}
                  >
                    Remove
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
