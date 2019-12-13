import React from "react";
import "../CSS/CommentCard.css";
import CommentVoteUpdater from "./VoteUpdater";
import DeleteButton from "./DeleteButton";
import moment from "moment";

export default function CommentCard(props) {
  const { comment, currentUser } = props;
  return (
    <li className="commentListItem">
      <h3 className="commentAuthor">{comment.author}</h3>
      <h5 className="commentCreatedAt">
        written{" "}
        {moment(comment.created_at)
          .startOf("minute")
          .fromNow()}
      </h5>
      <p className="commentBody">{comment.body}</p>
      <CommentVoteUpdater
        comment_id={comment.comment_id}
        votes={comment.votes}
      />
      {currentUser === comment.author ? (
        <DeleteButton
          deleteComment={props.deleteComment}
          comment_id={comment.comment_id}
        />
      ) : null}
    </li>
  );
}
