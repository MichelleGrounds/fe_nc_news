import React, { Component } from "react";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import ViewToggler from "./ViewToggler";
import Pagination from "./Pagination";
import ErrorDisplay from "./ErrorDisplay";
import "../CSS/CommentList.css";
import * as api from "../api";

export default class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null,
    p: 1,
    limit: 10,
    totalCount: 0
  };

  render() {
    const { err } = this.state;
    const { article_id } = this.props;
    const { comments } = this.state;
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <ViewToggler className="viewTogglerCommentAdder">
          <CommentAdder
            article_id={article_id}
            addComment={this.addComment}
            currentUser={this.props.currentUser}
          />
        </ViewToggler>

        <ul className="unorderedCommentList">
          {comments.map(comment => {
            return (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                currentUser={this.props.currentUser}
                deleteComment={this.deleteComment}
              />
            );
          })}
          {err && <ErrorDisplay err={err} />}
          <Pagination
            total_count={this.state.total_count}
            p={this.state.p}
            limit={this.state.limit}
            changePage={this.changePage}
          />
        </ul>
      </div>
    );
  }

  changePage = p => {
    this.setState(currentState => {
      return { p: currentState.p + p };
    });
  };

  updateSortBy = sort_by => {
    this.setState(currentState => {
      return { sort_by };
    });
  };

  updateOrder = order => {
    this.setState(currentState => {
      if (currentState.sort_by !== order) {
        return { order };
      }
    });
  };

  deleteComment = comment_id => {
    api.deleteCommentById(comment_id).then(() => {
      this.getComments();
    });
  };

  addComment = newComment => {
    this.setState(currentState => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  getComments = () => {
    api
      .getCommentsByArticleId(this.props.article_id, this.state.p)
      .then(data => {
        this.setState({
          comments: data.comments,
          total_count: data.total_count,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data }
        });
      });
  };

  componentDidMount = () => {
    this.getComments();
  };

  componentDidUpdate = (prevProps, currentState) => {
    if (this.state.p !== currentState.p) {
      this.getComments();
    }
  };
}
