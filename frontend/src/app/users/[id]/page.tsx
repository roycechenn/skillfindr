import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = typeof params?.id === "string" ? params.id : "";

  return (
    <div className="stack">
      <div className="card">
        <div className="section-title">
          <span className="badge">Partner</span>
          <span className="muted">{userId ? `User #${userId}` : "Public profile"}</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Profile data will render here once fetched from the backend (name, bio, skills, availability, reviews).
        </p>
      </div>
    </div>
  );
}
