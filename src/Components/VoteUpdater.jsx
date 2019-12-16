import React, { Component } from "react";
import ErrorDisplay from "./ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import * as api from "../api";
import "../CSS/VoteUpdater.css";

export default class VoteUpdater extends Component {
  state = {
    voteDifference: 0,
    err: null
  };

  render() {
    const { err, voteDifference } = this.state;
    return (
      <div className="commentVoteUpdater">
        <div className="commentVoteButtonsDiv">
          <FontAwesomeIcon
            className={`fontAwesomeButton ${
              voteDifference > 0 ? "notActiveButton" : null
            }`}
            onClick={() => {
              this.patchVotes(1);
            }}
            icon={faArrowUp}
          />
          <p>Votes: {this.props.votes + this.state.voteDifference}</p>
          <FontAwesomeIcon
            className={`fontAwesomeButton ${
              voteDifference < 0 ? "notActiveButton" : null
            }`}
            onClick={() => {
              this.patchVotes(-1);
            }}
            icon={faArrowDown}
          />
        </div>
        {err && <ErrorDisplay err={err} />}
      </div>
    );
  }

  patchCommentVotes = (comment_id, voteChange) => {
    return api.patchCommentVotes(comment_id, voteChange);
  };

  patchArticleVotes = (article_id, voteChange) => {
    return api.patchArticleVotes(article_id, voteChange);
  };

  patchVotes = voteChange => {
    this.setState(currentState => {
      return {
        voteDifference: currentState.voteDifference + voteChange,
        err: null
      };
    });
    (this.props.article_id
      ? this.patchArticleVotes(this.props.article_id, voteChange)
      : this.patchCommentVotes(this.props.comment_id, voteChange)
    ).catch(err => {
      this.setState(currentState => {
        return {
          err: { status: err.response.status, msg: err.response.data },
          voteDifference: currentState.voteDifference - voteChange,
          votes: false
        };
      });
    });
  };
}
