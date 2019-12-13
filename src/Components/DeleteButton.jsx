import React from "react";

function DeleteButton(props) {
  const handleDelete = () => {
    props.deleteComment(props.comment_id);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Comment</button>
    </div>
  );
}

export default DeleteButton;
