// Import React and useState Hook
import React, { useState } from "react";

// Create functional component Alert
export default function Alert(props) {
  // Define state for visibility of the alert
  const [visible, setVisible] = useState(true);

  // Function to handle closing of the alert
  const handleClose = () => {
    // Set visibility to false to hide alert
    setVisible(false);
    // Set a timeout to make the alert visible again after 1501 ms
    setTimeout(() => {
      setVisible(true);
    }, 1501);
  };

  // Log the alert props to the console (useful for debugging)
  console.log(props.alert);

  // Function to capitalize the first letter of each word in the alert type
  const capitalise = (type) => {
    type = type.toLowerCase();
    const arr = type.split(" ");

    // Loop through each element of the array and capitalize the first letter
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    // Join the capitalized words back into a single string
    const ans = arr.join(" ");
    return ans;
  };

  // Render the component
  return (
    <div style={{ height: "50px", margin: "58px 0px 0px 0px" }}>
      {visible && props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {/* Display capitalized alert type and message */}
          <strong>{capitalise(props.alert.type)}</strong> :{" "}
          {props.alert.msg}
          {/* Close button for the alert */}
          <button
            type="button"
            className="btn-close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={handleClose}
          >
          </button>
        </div>
      )}
    </div>
  );
}
