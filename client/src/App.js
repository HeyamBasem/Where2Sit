import React, { useState } from "react";
import "./App.css";

const questions = [
  { id: "age", text: "What is your age?", type: "number" },
  { id: "has_children", text: "Do you have children?", type: "yesno-followup", followupId: "children_count", followupText: "How many children?", followupType: "number" },
  { id: "has_disabilities", text: "Do you have any disabilities?", type: "yesno" },
  { id: "fan_type", text: "Which team are you supporting?", type: "select", options: ["Al Hilal", "Al Nassr", "Al Ittihad", "Al Ahli", "Al Shabab", "Al Ettifaq"] },
  { id: "has_breathing_prob", text: "Do you have any breathing problems?", type: "yesno" },
  { id: "gender", text: "What is your gender?", type: "select", options: ["Male", "Female"] },
  { id: "group_status", text: "What is your group status?", type: "select", options: ["single", "couple", "group"] },
  { id: "preferred_gender_around", text: "Preferred gender of people around you?", type: "select", options: ["same", "different", "no_preference"] },
  { id: "need_near_bathroom", text: "Do you need to sit near a bathroom?", type: "yesno" },
  { id: "prefer_noise", text: "How much noise do you prefer?", type: "scale" },
  { id: "prefer_away_from_sun", text: "Do you prefer to sit away from the sun?", type: "yesno" },
  { id: "love_near_screens", text: "Do you love being near big screens?", type: "yesno" },
  { id: "vip_status", text: "Do you have VIP access?", type: "yesno" },
  // Seat preference questions
  { id: "preferred_section", text: "Which section do you prefer?", type: "select", options: ["North", "South", "East", "West", "VIP"] },
  { id: "seat_category", text: "Preferred seat category?", type: "select", options: ["Standard", "Premium", "VIP"] },
  { id: "max_price", text: "What is the maximum price you're willing to pay for a seat?", type: "number" }
];

export default function StadiumSeatingApp() {
  const [answers, setAnswers] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);


  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitted answers:", answers); // Log the data to console

    // Simulating a response with seat number 9
    const seatNumber = [112345];

    setResponse({ seat: seatNumber });

    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="header">Let's pick up a seat for you!</h1>

        {questions.map((q) => (
          <div key={q.id} className="question-container">
            <label className="question-text">{q.text}</label>
            <br />
            {q.type === "yesno" && (
              <select
                value={answers[q.id] ?? ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value === "true")}
                className="select-input"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            )}

            {q.type === "yesno-followup" && (
              <>
                <select
                  value={answers[q.id] ?? ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value === "true")}
                  className="select-input"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {answers[q.id] === true && (
                  <div style={{ marginTop: "10px" }}>
                    <label className="question-text">{q.followupText}</label>
                    <br />
                    <input
                      type="number"
                      value={answers[q.followupId] || ""}
                      onChange={(e) => handleAnswerChange(q.followupId, parseInt(e.target.value))}
                      className="number-input"
                    />
                  </div>
                )}
              </>
            )}

            {q.type === "number" && (
              <input
                type="number"
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, parseInt(e.target.value))}
                className="number-input"
              />
            )}

            {q.type === "select" && (
              <select
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                className="select-input"
              >
                <option value="">Select</option>
                {q.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {q.type === "scale" && (
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid #aaa",
                      backgroundColor: answers[q.id] === val ? "#4caf50" : "white",
                      color: answers[q.id] === val ? "white" : "black",
                    }}
                    onClick={() => handleAnswerChange(q.id, val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`button ${loading ? 'button-disabled' : ''}`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {response && (
          <div className="response-container">
            <h2 className="response-text">Your Perfect Seat:</h2>
            <p className="response-text">Your perfect seat is {response.seat}!</p>

            <div style={{ marginTop: "20px" }}>
              <h3 className="response-text">How would you rate this recommendation?</h3>
              <div style={{ fontSize: "24px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    style={{
                      cursor: "pointer",
                      color: star <= userRating ? "#FFD700" : "#ccc",
                      fontSize: "30px",
                      marginRight: "5px"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {userRating && (
                <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                  Thanks for rating this {userRating} star{userRating > 1 ? "s" : ""}!
                </p>
              )}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
