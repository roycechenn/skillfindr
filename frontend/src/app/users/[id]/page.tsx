import { SkillInterest, UserProfile } from "../../../lib/types";

const profile: UserProfile = {
  id: "user-1",
  name: "Musa R.",
  location: "Nairobi · GMT+3",
  bio: "Systems engineer focused on performance. Looking to finally get comfortable in Python for data analysis.",
  rating: 4.8,
  reviews: 24,
  teach: [
    { name: "C++", level: "advanced", topics: ["performance", "tooling"] },
    { name: "Algorithms", level: "advanced" },
  ],
  learn: [
    { name: "Python", level: "beginner", goal: "data analysis" },
    { name: "Data Viz" },
  ],
  availability: [
    { day: "Tuesday", start: "17:00", end: "19:00", timezone: "GMT+3" },
    { day: "Saturday", start: "10:00", end: "12:00", timezone: "GMT+3" },
  ],
};

const SkillGroup = ({ label, items }: { label: string; items: SkillInterest[] }) => (
  <div className="card">
    <div className="section-title">
      <span className="badge">{label}</span>
      <span className="muted">{items.length} skills</span>
    </div>
    <div className="row">
      {items.map((skill) => (
        <span key={skill.name} className="tag">
          {skill.name}
          {skill.level ? ` · ${skill.level}` : ""}
          {skill.goal ? ` · ${skill.goal}` : ""}
        </span>
      ))}
    </div>
  </div>
);

export default function UserProfilePage() {
  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Partner</span>
          <span className="muted">Public profile</span>
        </div>
        <h2 style={{ margin: "6px 0" }}>{profile.name}</h2>
        <p className="muted" style={{ margin: 0 }}>
          {profile.location}
        </p>
        {profile.bio && <p className="muted">{profile.bio}</p>}
        <div className="row">
          <span className="pill">{profile.rating?.toFixed(1)}★ ({profile.reviews} reviews)</span>
          <span className="pill">Prefers 60-90 minute sessions</span>
        </div>
      </div>

      <SkillGroup label="Can teach" items={profile.teach} />
      <SkillGroup label="Wants to learn" items={profile.learn} />

      <div className="card">
        <div className="section-title">
          <span className="badge">Availability</span>
          <span className="muted">Shared in their timezone</span>
        </div>
        <div className="grid two">
          {profile.availability.map((slot) => (
            <div key={`${slot.day}-${slot.start}`} className="card" style={{ padding: 12 }}>
              <strong>{slot.day}</strong>
              <p className="muted" style={{ margin: 0 }}>
                {slot.start} → {slot.end} ({slot.timezone})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
