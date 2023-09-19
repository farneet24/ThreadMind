import React, { useState } from "react";

export default function Alert(props) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 1501);
  };

  console.log(props.alert);
  const capitalise = (type) => {
    type = type.toLowerCase();
    const arr = type.split(" ");

    //loop through each element of the array and capitalize the first letter.

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    const ans = arr.join(" ");
    return ans;
  };

  return (
    <div style={{ height: "50px", margin : "58px 0px 0px 0px" }}>
      {visible && props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalise(props.alert.type)}</strong> :{" "}
          {props.alert.msg}
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
