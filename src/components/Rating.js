import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledRating = styled(Rating)`
  & .MuiRating-iconEmpty {
    color: var(--star-border-color);
  }
`;

const RatingForm = ({ mode }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(-1);
  const labels = {
    0.5: "Poor",
    1: "Poor+",
    1.5: "Fair",
    2: "Fair+",
    2.5: "Good",
    3: "Good+",
    3.5: "Very Good",
    4: "Very Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      rating: rating,
      label: labels[rating], // Include the label
    };

    fetch("https://formspree.io/f/mrgvyjrd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const starStyle = mode === "dark" ? { "--star-border-color": "white" } : {};

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const responsiveStyle =
    window.innerWidth > 768 ? { flexDirection: "row" } : {};

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...formStyle,
        ...responsiveStyle,
        display: "flex",
        alignItems: "center",
      }}
    >
      {!submitted ? (
        <>
          <span
            style={{
              color: mode === "dark" ? "#F900BF" : "#D61C4E",
              marginRight: "10px",
            }}
          >
            Rate ThreadMind:
          </span>
          <StyledRating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            style={{
              ...starStyle,
              marginRight: "10px",
            }}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {rating !== null && (
            <span
              style={{
                marginRight: "10px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "0px",
                color: mode === "dark" ? "white" : "black",
              }}
            >
              {labels[hover !== -1 ? hover : rating]}
            </span>
          )}
          {rating > 0 && (
            <Button
              variant="contained"
              color="success"
              size="small"
              type="submit"
            >
              Rate
            </Button>
          )}
        </>
      ) : (
        <p style={{ color: mode === "dark" ? "#16FF00" : "#B3005E" }}>
          Thank you for rating!
        </p>
      )}
    </form>
  );
};

export default RatingForm;
