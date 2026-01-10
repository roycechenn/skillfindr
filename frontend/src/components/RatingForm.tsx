"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSubmit?: (payload: { rating: number; feedback: string }) => void;
  initialRating?: number;
}

export function RatingForm({ onSubmit, initialRating = 5 }: Props) {
  const [rating, setRating] = useState(initialRating);
  const [feedback, setFeedback] = useState("This session helped me make progress.");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit?.({ rating, feedback });
    setSubmitted(true);
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="section-title">
        <span className="badge">Rate session</span>
        <span className="muted">Share how it went</span>
      </div>

      <div>
        <label htmlFor="rating">Rating: {rating}/5</label>
        <input id="rating" type="range" min={1} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))} />
      </div>

      <div>
        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What worked? What should be different next time?"
        />
      </div>

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        {submitted ? <span className="muted">Thanks for closing the loop.</span> : <span className="muted">Visible to your partner.</span>}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
