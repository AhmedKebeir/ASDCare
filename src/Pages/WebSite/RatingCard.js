import React, { useState } from "react";
import "../../CSS/RatingCard.css";
import { FaStar } from "react-icons/fa";

export default function RatingCard() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="choose-child-test change-pass">
      <div className="choose">
        <div className="rating-card">
          <h2>Rate this session</h2>
          <div className="stars">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#FFD700" : "#ccc"
                    }
                    size={40}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <input type="text" placeholder="Why you recommend this doctor" />
          <button className="rate-btn">Rate now</button>
        </div>
      </div>
    </div>
  );
}
