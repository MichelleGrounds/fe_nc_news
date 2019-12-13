import React from "react";

function ErrorDisplay(props) {
  const { err } = props;
  console.dir(props);

  return (
    <div>
      {err.msg.msg === 'Key (author)=() is not present in table "users".' ? (
        <p>{err.status} - Please log in to post a comment</p>
      ) : (
        <p>
          {err.status} -{err.msg.msg}
        </p>
      )}
    </div>
  );
}
//set default error to 500 -> coming down from App.

export default ErrorDisplay;
