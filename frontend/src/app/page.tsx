export default function Page() {
  return (
    <div className="stack">
      <div className="hero">
        <div>
          <h1>SkillFindr</h1>
          <p>
            Two people get together to teach and learn from each other. If you want to learn Python and someone wants to learn C++,
            you split the time, swap knowledge, and both leave better than you arrived.
          </p>
          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn btn-primary" href="/signup">
              Start a swap
            </a>
            <a className="btn" href="/matches">
              See matches
            </a>
          </div>
        </div>
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            How it works
          </p>
          <ul className="list">
            <li>Set what you can teach and what you want to learn.</li>
            <li>We find matches with overlapping availability.</li>
            <li>Agree on a contract, schedule, and get a Jitsi link instantly.</li>
          </ul>
        </div>
      </div>

      <div className="grid two">
        <div className="card">
          <div className="section-title">
            <span className="badge">Matchmaking</span>
            <span className="muted">Learn + teach equilibrium</span>
          </div>
          <p className="muted">
            Pair with people who want what you offer, with clear time splits and availability so you can focus on learning.
          </p>
          <div className="row">
            <span className="tag">Fair time split</span>
            <span className="tag">Skill-based rankings</span>
            <span className="tag">Timezone-aware</span>
          </div>
        </div>

        <div className="card">
          <div className="section-title">
            <span className="badge">Sessions</span>
            <span className="muted">Zero-config video</span>
          </div>
          <p className="muted">
            Meetings are powered by Jitsi. Every session generates a unique link so strangers cannot drop into your lesson.
          </p>
          <div className="pill" style={{ width: "100%", justifyContent: "space-between" }}>
            <span>Example: https://meet.jit.si/AppMeet-abcdef1234</span>
            <span role="img" aria-label="lock">
              🔒
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
