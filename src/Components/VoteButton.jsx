import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../CSS/VoteButton.css";

function VoteButton(props) {
  return (
    <div className="upAndDownVoteButtons">
      <FontAwesomeIcon
        onClick={event => props.alterVoteCount(1)}
        icon={faArrowUp}
      />
      <FontAwesomeIcon
        onClick={event => props.alterVoteCount(-1)}
        icon={faArrowDown}
      />
    </div>
  );
}

export default VoteButton;
