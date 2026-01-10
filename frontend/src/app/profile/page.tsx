"use client";

import { FormEvent, useState } from "react";
import { SkillPicker } from "../../components/SkillPicker";
import { AvailabilityEditor } from "../../components/AvailabilityEditor";
import { AvailabilitySlot, SkillInterest } from "../../lib/types";

const presets = ["Python", "C++", "React", "UI Design", "Figma", "Public Speaking", "French", "Guitar", "SQL", "Cloud"];

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [teach, setTeach] = useState<SkillInterest[]>([]);
  const [learn, setLearn] = useState<SkillInterest[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("Profile saved locally. Connect this form to the backend to persist.");
  };

  return (
    <div className="stack">
      <form className="card stack" onSubmit={handleSubmit}>
        <div className="section-title">
          <span className="badge">My profile</span>
          <span className="muted">Keep your details fresh</span>
        </div>

        <div className="grid two">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <span className="muted">We share your name and skills with partners.</span>
          <button className="btn btn-primary" type="submit">
            Save profile
          </button>
        </div>

        {status && <p className="muted">{status}</p>}
      </form>

      <SkillPicker title="I can teach" presetSkills={presets} selections={teach} onChange={setTeach} />
      <SkillPicker title="I want to learn" presetSkills={presets} selections={learn} onChange={setLearn} />
      <AvailabilityEditor slots={availability} onChange={setAvailability} />
    </div>
  );
}
