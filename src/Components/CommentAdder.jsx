import React, { Component } from "react";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../api";

export default class CommentAdder extends Component {
  state = {
    commentInput: "",
    err: null
  };
  render() {
    const { err } = this.state;
    if (!this.props.currentUser) {
      return <p>Please log in before posting a comment</p>;
    }
    return (
      <form className="commentAddForm" onSubmit={this.handleSubmit}>
        <p>Logged in as {this.props.currentUser}</p>
        <label>
          Comment:
          <input
            name="commentInput"
            value={this.state.commentInput}
            onChange={this.handleInput}
            required={true}
          ></input>
        </label>
        <button>Submit Comment</button>
        {err && <ErrorDisplay err={err} />}
      </form>
    );
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .addComment(
        this.props.article_id,
        this.props.currentUser,
        this.state.commentInput
      )
      .then(comment => {
        this.setState({ commentInput: "", err: null });
        this.props.addComment(comment);
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data }
        });
      });
  };
}
