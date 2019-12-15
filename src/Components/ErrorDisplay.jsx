import React from "react";

function ErrorDisplay(props) {
  const { err } = props;

  return (
    <div>
      <p>{err ? `${err.status} - ${err.msg.msg}` : "Invalid path"}</p>
    </div>
  );
}

export default ErrorDisplay;
